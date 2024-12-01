const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.post('/add', orderController.addOrder);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);
router.get('/count', orderController.getOrderCount);
router.get('/status/:status', orderController.getOrdersByStatus);


module.exports = router;
