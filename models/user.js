const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  iduser: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true } 
  
});

module.exports = mongoose.model('User', userSchema);
