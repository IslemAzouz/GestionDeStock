import React, { useState } from 'react';
import axios from 'axios';
import { Menu, Search, Bell, ChevronDown, Calendar, Filter } from "lucide-react";

const OrdersPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    date: '',
    customer: '',
    salesChannel: '',
    destination: '',
    items: 0,
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/add', newOrder);
      alert('Order added successfully');
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Failed to add order');
    }
  };

  const orderData = [
    {
      id: '#7676',
      date: '06/30/2022',
      customer: 'Ramesh Chaudhary',
      salesChannel: 'Store name',
      destination: 'Lalitpur',
      items: 3,
      status: 'Completed'
    },
    // Add more order data if needed...
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
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
              <span className="text-sm">Ann Lee</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Orders Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Orders</h1>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => setIsPopupOpen(true)}
              >
                + New Order
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="w-8 p-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Sales channel
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orderData.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="w-8 p-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.salesChannel}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.destination}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.items}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Order Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">Add New Order</h2>
              <form onSubmit={handleAddOrder}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Order ID</label>
                  <input
                    type="text"
                    name="orderId"
                    value={newOrder.orderId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newOrder.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <input
                    type="text"
                    name="customer"
                    value={newOrder.customer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Sales Channel</label>
                  <input
                    type="text"
                    name="salesChannel"
                    value={newOrder.salesChannel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={newOrder.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Items</label>
                  <input
                    type="number"
                    name="items"
                    value={newOrder.items}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newOrder.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
