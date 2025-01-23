const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);