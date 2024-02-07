const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  idcomment: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  PubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication', required: true },
  iduser: { type: String, required: true }, 

  
});

module.exports = mongoose.model('Comment', commentSchema);
