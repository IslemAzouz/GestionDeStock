const Sale = require('../model/Sale');
const Stock = require('../model/StockModel'); // Import the Stock model


// Fetch all sales
const getSales = (req, res) => {
  Sale.find({})
    .then((sales) => res.status(200).send(sales))
    .catch((error) => res.status(500).send(error));
};

// Fetch a single sale by ID
const getSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id).lean();
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new sale
const addSale = async (req, res) => {
  const { customer, product, quantity, price, category, storeName } = req.body;

  if (!customer || !product || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const totalAmount = price * quantity;
  const saleDate = req.body.date || new Date();

  try {
    // Create the new sale
    const sale = await Sale.create({
      date: saleDate,
      customer,
      product,
      quantity,
      totalAmount,
      category,  
      storeName, 
    });

    // Update the stock after sale
    const productInStock = await Stock.findOne({ product });

    if (productInStock) {
      if (productInStock.quantity >= quantity) {
        // Decrease the stock quantity
        productInStock.quantity -= quantity;
        await productInStock.save();
      } else {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
    } else {
      return res.status(404).json({ message: 'Product not found in stock' });
    }

    res.status(201).send(sale);
  } catch (err) {
    res.status(500).send({ message: 'Failed to add sale', error: err.message });
  }
};


// Update a sale
const updateSale = (req, res) => {
  Sale.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      customer: req.body.customer,
      product: req.body.product,
      quantity: req.body.quantity,
      totalAmount: req.body.totalAmount,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Sale not found' });
      }
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
};

// Delete a sale
const deleteSale = (req, res) => {
  Sale.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Sale not found' });
      }
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
};

const getSalesCount = async (req, res) => {
  try {
    const count = await Sale.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales count", error });
  }
};

module.exports = { getSales, getSale, addSale, updateSale, deleteSale ,getSalesCount };