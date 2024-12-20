const Order = require('../model/Order');
const Stock = require('../model/StockModel');

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

const addOrder = async function (req, res) {
  console.log(req.body); // Log the incoming request body for debugging

  const { date, product, items, status ,category ,storeName} = req.body;

  if (!date  || !product || !items || !status || !category || !storeName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create the new order with a single product and quantity
    const order = await Order.create({
      date,
      product,
      items, 
      status,
      category,
      storeName

    });

    // Check if the order status is "completed"
    if (status === "completed") {
      // Find the product in stock and update quantity
      const productInStock = await Stock.findOne({ product });

      if (productInStock) {
        // Add the quantity to the existing stock
        productInStock.quantity += items; // 'items' is the quantity now
        await productInStock.save();
      } else {
        // If the product doesn't exist in stock, add it as a new entry
        await Stock.create({
          product,
          category: req.body.category,  // Assuming category is passed in the request body
          storeName: req.body.storeName,  // Assuming storeName is passed in the request body
          quantity: items,  // 'items' is the quantity now
        });
      }
    }

    res.status(200).send(order);
  } catch (err) {
    console.error('Error inserting order:', err);
    res.status(500).send({ message: 'Failed to add order', error: err.message });
  }
};


const updateOrder = async function (req, res) {
  try {
    const { id } = req.params;
    const { date, product, items, status, category, storeName } = req.body;

    // Validate required fields
    if (!date || !product || !items || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { date, product, items, status, category, storeName },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'completed') {
      const productInStock = await Stock.findOne({ product });

      if (productInStock) {
        productInStock.quantity += items; // Update stock quantity
        await productInStock.save();
      } else {
        await Stock.create({
          product,
          category,
          storeName,
          quantity: items,
        });
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
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

const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order count", error });
  }
};
const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params; // Get status from request parameters

    // Find orders with the matching status
    const orders = await Order.find({ status });

    if (orders.length === 0) {
      return res.status(404).json({ message: `No orders found with status: ${status}` });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders by status", error: error.message });
  }
};


module.exports = { getOrders, getOrder, addOrder, updateOrder, deleteOrder , getOrderCount , getOrdersByStatus};
