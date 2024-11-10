const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/', orderController.getOrders);

// Get a specific order by ID
router.get('/:id', orderController.getOrder);

// Create a new order
router.post('/add', orderController.addOrder);

// Update an existing order
router.put('/:id', orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
