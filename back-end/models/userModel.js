const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
