const express = require("express");
const router = express.Router();
const stockController = require("../controllers/StockController");

router.get("/getall", stockController.getAllStocks);
router.get("/get/:id", stockController.getStockById);
router.post('/add', stockController.addStock);
router.put("/update/:id", stockController.updateStock);
router.delete("/delete/:id", stockController.deleteStock);
router.get("/count", stockController.getStockCount);


module.exports = router;
