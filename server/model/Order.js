const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: { 
    type: Date,
    required: true 
  },
  customer: {
    type: String, 
    required: true 
  },
  salesChannel: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  items: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String,
    required: true 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
