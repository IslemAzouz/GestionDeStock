const Order = require('../model/Order');
const Product = require('../model/Product');

// Controller to get dynamic data for the dashboard
const getDashboardData = async (req, res) => {
  try {
    // 1. Metrics (Revenue, Sales, etc.)
    const revenue = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    
    const sales = await Order.countDocuments({
      status: 'completed',
    });

    const returns = await Order.countDocuments({
      status: 'returned',
    });

    const purchase = await Order.countDocuments({
      status: 'purchased',
    });

    // Metrics response
    const metrics = [
      { title: 'Revenue', amount: revenue[0] ? revenue[0].totalRevenue : 0 },
      { title: 'Sales', amount: sales || 0 },
      { title: 'Sales Returns', amount: returns || 0 },
      { title: 'Purchases', amount: purchase || 0 },
    ];

    // 2. Chart Data (Dynamic data based on sales per month)
    const chartData = await Order.aggregate([
      { $project: { month: { $month: '$date' }, totalPrice: 1 } },
      { $group: { _id: '$month', sales: { $sum: '$totalPrice' } } },
      { $sort: { _id: 1 } },
    ]);

    // 3. Stock Alert Data (Low stock, high demand, etc.)
    const lowStockProducts = await Product.find({
      stockQuantity: { $lte: 10 }, // Example for low stock condition
    });

    const stockAlertData = lowStockProducts.map((product) => ({
      productId: product._id,
      productName: product.name,
      stockQuantity: product.stockQuantity,
      alertAmount: 'Low Stock',
      status: 'Pending',
    }));

    // 4. Top Selling Products
    const topSellingProducts = await Order.aggregate([
      { $group: { _id: '$productId', totalQuantity: { $sum: '$quantity' } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    // Map over the top-selling products and find product details
    const topSellingProductDetails = await Promise.all(
      topSellingProducts.map(async (order) => {
        const product = await Product.findById(order._id);
        return {
          productId: product._id,
          productName: product.name,
          quantitySold: order.totalQuantity,
          alertAmount: 'High Demand',
        };
      })
    );

    // Send all the data as JSON response
    res.status(200).json({
      metrics,
      chartData,
      stockAlertData,
      topSellingProducts: topSellingProductDetails,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data.' });
  }
};

module.exports = {
  getDashboardData,
};
