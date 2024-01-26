const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  idcomment: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true }

  
});

module.exports = mongoose.model('Comment', commentSchema);
