const mongoose = require('mongoose');



const mediaSchema = new mongoose.Schema({
  idmedia: mongoose.Schema.Types.ObjectId,
  filename: { type: String, required: true }, // Nom du fichier
  uploadDate: { type: Date, default: Date.now }, // Date de téléversement du média
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID de l'utilisateur qui a téléversé le média
  
});



module.exports = mongoose.model('Media', mediaSchema);
