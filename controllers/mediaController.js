const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const Media = require('../models/media');
const mongoose = require('mongoose');

// Importez vos informations d'identification à partir du fichier de configuration
//const { azureStorageAccountName, azureStorageAccountKey, azureContainerName } = require('../config');


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

    // Enregistrez les informations du média dans la base de données
    const uploader = new mongoose.Types.ObjectId(req.user);
    const media = new Media({
      filename: blobName,
      uploaderId: uploader, // Supposons que vous stockez l'ID de l'utilisateur dans req.userId
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




