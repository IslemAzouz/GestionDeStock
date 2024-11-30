const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSale);
router.post('/add', salesController.addSale);
router.put('/update/:id', salesController.updateSale);
router.delete('/delete/:id', salesController.deleteSale);
router.get('/count', salesController.getSalesCount);


module.exports = router;