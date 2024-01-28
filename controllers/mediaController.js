const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const Media = require('../models/media');
const fs = require('fs');

// Importez vos informations d'identification à partir du fichier de configuration
const { azureStorageAccountName, azureStorageAccountKey, azureContainerName } = require('../config');

// Configuration du client BlobService pour Azure Blob Storage
const sharedKeyCredential = new StorageSharedKeyCredential(azureStorageAccountName, azureStorageAccountKey);
const blobServiceClient = new BlobServiceClient(`https://${azureStorageAccountName}.blob.core.windows.net`, sharedKeyCredential);

// Contrôleur pour télécharger un média sur Azure Blob Storage
exports.uploadMedia = async (req, res) => {
  try {
    const blobName = `${Date.now()}-${req.file.originalname}`;

    // Obtenez une référence au conteneur Azure Blob Storage
    const containerClient = blobServiceClient.getContainerClient(azureContainerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Chargez le fichier dans le conteneur Blob
    const stream = fs.createReadStream(req.file.path);
    await blockBlobClient.uploadStream(stream, undefined, undefined, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });

    // Supprimez le fichier temporaire après le téléchargement
    fs.unlinkSync(req.file.path);

    // Enregistrez les informations du média dans la base de données
    const media = new Media({
      filename: blobName,
      uploaderId: req.userId, // Supposons que vous stockez l'ID de l'utilisateur dans req.userId
      url: blockBlobClient.url
    });

    const savedMedia = await media.save();
    res.json({ message: 'Fichier média téléchargé avec succès', media: savedMedia });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du téléchargement du fichier média' });
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
