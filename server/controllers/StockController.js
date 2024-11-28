const stock = require("../model/StockModel");

const getAllStocks = async (req, res) => {
  try {
    const stocks = await stock.find();
    res.status(200).send(stocks);
  } catch (error) {
    res.status(200).json({ message: "Error fetching stocks" });
  }
};

const getStockById = async (req, res) => {
  try {
    const stock = await stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock by ID" });
  }
};

const addStock = async (req, res) => {
  const { product, category, storeName, quantity } = req.body;

  if (!product || !category || !storeName || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStock = new stock({ product, category, storeName, quantity });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: "Error adding stock" });
  }
};

const updateStock = async (req, res) => {
  const { product, category, storeName, quantity } = req.body;
  try {
    const updatedStock = await stock.findByIdAndUpdate(
      req.params.id,
      { product, category, storeName, quantity },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: "Error updating stock" });
  }
};

const deleteStock = async (req, res) => {
  try {
    const deletedStock = await stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stock" });
  }
};

const getStockCount = async (req, res) => {
  try {
    const count = await stock.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock count", error });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  addStock,
  updateStock,
  deleteStock,
  getStockCount,
};
