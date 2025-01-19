const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  monthly_cost: { type: String },
  model: { type: String, required: true },
  image: { type: String },
  distance_travelled: { type: String },
  seats: { type: String },
  gearbox: { type: String },
  fuel_type: { type: String },
  license_plate: { type: String },
  location: { type: String },
  status: { type: String, enum: ['in_stock', 'in_order', 'sold'], default: 'in_stock' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
