const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre de la publication
  text: { type: String, required: true }, // Texte de la publication
  filename: { type: String, required: true }, // Nom du fichier
  uploaderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID de l'utilisateur ayant téléchargé le média
  url: { type: String, required: true }, // URL du média stocké dans Azure Blob Storage
  createdAt: { type: Date, default: Date.now } // Date de création du média
});

const Publication = mongoose.model('Publication', publicationSchema); // Modèle Publication

module.exports = Publication;
