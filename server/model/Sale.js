const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customer: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});


const Sale = mongoose.model('Sale', saleSchema, 'sales');

module.exports = Sale;