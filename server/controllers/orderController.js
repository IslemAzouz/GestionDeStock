const Order = require("../model/Order");

// Get all orders
const getOrders = function (req, res) {
  Order.find({})
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).lean();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
const addOrder = function (req, res) {
  const { orderId, date, customer, salesChannel, destination, items, status } = req.body;

  if (!orderId || !date || !customer || !salesChannel || !destination || !items || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Order.insertMany({
    orderId,
    date,
    customer,
    salesChannel,
    destination,
    items,
    status,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Update an order
const updateOrder = function (req, res) {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      orderId: req.body.orderId,
      date: req.body.date,
      customer: req.body.customer,
      salesChannel: req.body.salesChannel,
      destination: req.body.destination,
      items: req.body.items,
      status: req.body.status,
    },
    { new: true }  // This option returns the updated order
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).send(result); // result is an object
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Delete an order
const deleteOrder = function (req, res) {
  Order.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).send(result); // result is the deleted object
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { getOrders, getOrder, addOrder, updateOrder, deleteOrder };
