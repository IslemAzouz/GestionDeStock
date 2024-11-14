import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

const StockPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newStockItem, setNewStockItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    stockStatus: ''
  });

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/stock/');
        setStockData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStockItem({ ...newStockItem, [name]: value });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!newStockItem.name || !newStockItem.category || newStockItem.quantity <= 0 || !newStockItem.stockStatus) {
      alert('Please fill in all fields correctly');
      return;
    }
    try {
      await axios.post('http://localhost:4000/stock/add', newStockItem);
      alert('Stock item added successfully');
      setIsPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding stock item:', error.response?.data || error.message);
      alert('Failed to add stock item');
    }
  };
  useEffect(() => {
    // Check for products with stock of 5 or less
    const lowStockItems = stockData.filter((item) => item.stockQuantity = 5);
    setLowStockAlert(lowStockItems);
  }, [stockData]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-20 bg-purple-600 text-white">
        <div className="p-4">
          <Menu className="w-6 h-6" />
        </div>
        <nav className="flex flex-col gap-4 p-2">
          {[
            { name: 'Dashboard', icon: 'grid' },
            { name: 'In Stock', icon: 'box' },
            { name: 'Products', icon: 'package' },
            { name: 'Sales', icon: 'trending-up' },
            { name: 'Orders', icon: 'shopping-cart' },
            { name: 'Users', icon: 'users' }
          ].map((item) => (
            <button
              key={item.name}
              className="p-2 rounded hover:bg-purple-700 flex flex-col items-center text-xs"
            >
              <div className="w-6 h-6 mb-1 bg-purple-400 rounded" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        <header className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <span className="text-sm">user</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Stock</h1>
            <button
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => setIsPopupOpen(true)}
            >
              + New Stock Item
            </button>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="w-8 p-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                   
</tr>
</thead>
</table>
</div>
</div>
</div>
</div>
</div>
  )
} 