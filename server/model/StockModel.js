const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product: { type: String, required: true },
  category: { type: String, required: true },
  storeName: { type: String, required: true },
  quantity: { type: Number, required: true },
}, 
{ timestamps: true });


const stock = mongoose.model("Stock", stockSchema);
module.exports = stock;