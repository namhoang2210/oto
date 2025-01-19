const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  payment_method: { type: String, required: true },
  status: { type: String, enum: ['confirming', 'confirmed'], default: 'confirming' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
