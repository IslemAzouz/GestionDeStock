const Product = require('../model/Product');

// Obtenir tous les produits en stock
const getStock = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en stock:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits en stock.' });
  }
};

// Ajouter un nouveau produit au stock
const addProductToStock = async (req, res) => {
  const { name, price, stockQuantity, category, supplier } = req.body;

  if (!name || !price || !stockQuantity || !category || !supplier) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const product = new Product({
      name,
      price,
      stockQuantity,
      category,
      supplier,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au stock:', error);
    res.status(500).json({ message: 'Échec de l\'ajout du produit au stock.' });
  }
};

// Mettre à jour les informations d'un produit en stock
const updateStockProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stockQuantity, category, supplier } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stockQuantity, category, supplier },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit en stock:', error);
    res.status(500).json({ message: 'Échec de la mise à jour du produit en stock.' });
  }
};

// Supprimer un produit du stock
const deleteStockProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Erreur lors de la suppression du produit du stock:', error);
    res.status(500).json({ message: 'Échec de la suppression du produit du stock.' });
  }
};

// Exporter les contrôleurs
module.exports = {
  getStock,
  addProductToStock,
  updateStockProduct,
  deleteStockProduct,
};
