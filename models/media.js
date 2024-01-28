const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // Nom du fichier
  uploaderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID de l'utilisateur ayant téléchargé le média
  url: { type: String, required: true }, // URL du média stocké dans Azure Blob Storage
  createdAt: { type: Date, default: Date.now } // Date de création du média
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
