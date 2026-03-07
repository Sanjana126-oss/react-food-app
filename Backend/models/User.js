const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ADDED: Role field with restricted values
  role: { 
    type: String, 
    default: 'user', 
    enum: ['user', 'admin'] 
  }
}, { minimize: false }); // preserve empty objects if any

module.exports = mongoose.model('User', UserSchema);