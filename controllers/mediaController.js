const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const Media = require('../models/media');
const mongoose = require('mongoose');

// Importez vos informations d'identification à partir du fichier de configuration
//const { azureStorageAccountName, azureStorageAccountKey, azureContainerName } = require('../config');
require('dotenv').config();


// Contrôleur pour télécharger un média sur Azure Blob Storage
exports.uploadMedia = async (req, res) => {
  try {

    let file = req.files.file;
    const blobName = `${Date.now()}-${file.name}`;

    const sharedKeyCredential = new StorageSharedKeyCredential(process.env.azureStorageAccountName, process.env.azureStorageAccountKey);
    const blobServiceClient = new BlobServiceClient(`https://${process.env.azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
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
    const userId1 = decodedToken.userId; // Supposons que votre token contient un champ userId
    
    const media = new Media({
      filename: blobName,
      uploaderId: userId1, 
      url: blockBlobClient.url
    });

    const savedMedia = await media.save();
    res.json({ message: 'Fichier média téléchargé avec succès', media: savedMedia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour obtenir tous les médias depuis la base de données
exports.getAllMedia = async (req, res) => {
  try {
    const allMedia = await Media.find();
    res.json(allMedia);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des fichiers média' });
  }
};




