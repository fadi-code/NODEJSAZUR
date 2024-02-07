const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const Publication = require('../models/publication'); // Importez le modèle de publication
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken

// Importez vos informations d'identification à partir du fichier de configuration
require('dotenv').config();

// Contrôleur pour télécharger un média sur Azure Blob Storage
exports.uploadPub = async (req, res) => {
  try {
    let file = req.files.file;
    const blobName = `${Date.now()}-${file.name}`;

    const sharedKeyCredential = new StorageSharedKeyCredential(process.env.azureStorageAccountName, process.env.azureStorageAccountKey);
    const blobServiceClient = new BlobServiceClient(`https://${process.env.azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(process.env.azureContainerName); // Utilisez process.env.azureContainerName
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Chargez le fichier dans le conteneur Blob
    await blockBlobClient.upload(file.data, file.size, { 
      blobHTTPHeaders: { blobContentType: file.mimetype } 
    });

    const authorizationHeader = req.headers.authorization;

    // Vérifier si le jeton est présent dans l'en-tête Authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    // Extraire le jeton en supprimant le préfixe "Bearer "
    const token = authorizationHeader.split(' ')[1];

    // Validation et extraction de l'ID de l'utilisateur et du statut d'administrateur à partir du jeton
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId1 = decodedToken.userId; //  token contient un champ userId
    
    const publication = new Publication({
      title: req.body.title,
      text: req.body.text,
      filename: blobName,
      uploaderId: userId1, 
      url: blockBlobClient.url
    });

    const savedPublication = await publication.save();
    res.json({ message: 'Fichier média téléchargé avec succès', publication: savedPublication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Contrôleur pour obtenir tous les médias depuis la base de données
exports.getAllPub = async (req, res) => {
  try {
    const allPublications = await Publication.find({}, { _id: 0, __v: 0 }); // Exclut _id et __v
    
    res.json(allPublications);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des publications' });
  }
};



// Contrôleur pour supprimer un média par ID utilisateur
exports.deletePubByUserId = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    
    // Vérifier si le jeton est présent dans l'en-tête Authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    // Extraire le jeton en supprimant le préfixe "Bearer "
    const token = authorizationHeader.split(' ')[1];

    // Validation et extraction de l'ID de l'utilisateur et du statut d'administrateur à partir du jeton
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId1 = decodedToken.userId; //  token contient un champ userId

    // Recherchez les médias téléchargés par cet utilisateur
    const publicationsToDelete = await Publication.find({ uploaderId: userId1 });

    // Supprimez les médias de la base de données
    await Publication.deleteMany({ uploaderId: userId1 });

    // Supprimez les fichiers correspondants dans Azure Blob Storage
    const sharedKeyCredential = new StorageSharedKeyCredential(process.env.azureStorageAccountName, process.env.azureStorageAccountKey);
    const blobServiceClient = new BlobServiceClient(`https://${process.env.azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);
    
    for (const publication of publicationsToDelete) {
      const blobClient = blobServiceClient.getBlobClient(publication.filename);
      await blobClient.delete();
    }

    res.json({ message: 'Publications supprimées avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression des publications' });
  }
};
