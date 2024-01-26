const mongoose = require('mongoose');


  const contentSchema = new mongoose.Schema({
    idcontent: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    text: { type: String, required: true },
    userId: { type: String, required: true }

  });
  

module.exports = mongoose.model('Content', contentSchema);
