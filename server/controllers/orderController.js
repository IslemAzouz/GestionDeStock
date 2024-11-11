
const Order = require('../model/Order');

const getOrders = function (req, res) {
  Order.find({})
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

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

const addOrder = function (req, res) {
  console.log(req.body); // Log the incoming request body for debugging

  const { date, customer, salesChannel, destination, items, status } = req.body;

  if (!date || !customer || !salesChannel || !destination || !items || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Order.insertMany({
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
      console.error('Error inserting order:', err);
      res.status(500).send({ message: 'Failed to add order', error: err.message });
    });
};


const updateOrder = function (req, res) {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      customer: req.body.customer,
      salesChannel: req.body.salesChannel,
      destination: req.body.destination,
      items: req.body.items,
      status: req.body.status,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteOrder = function (req, res) {
  Order.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { getOrders, getOrder, addOrder, updateOrder, deleteOrder };
