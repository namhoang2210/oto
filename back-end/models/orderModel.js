const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
