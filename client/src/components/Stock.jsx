import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown, Calendar, Trash2, Pencil } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Sidebar from './Sidebar';
import Header from './Header';


const Stock = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    date: '',
    storeName: '',
    product: '',
    category : '',
    items: 0,
    status: ''
  });
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editOrder, setEditOrder] = useState(null);
  
  const role = localStorage.getItem("role");
  console.log("Role: ", role);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/order/status/Completed');
        setOrderData(response.data);
        setFilteredData(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const searchAndFilterOrders = () => {
      let data = orderData;
      
      if (searchTerm) {
        data = data.filter(order => 
          (order.product && order.product.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (order.date && order.date.includes(searchTerm))
        );
      }

      if (filterStatus !== 'All') {
        data = data.filter(order => order.status === filterStatus);
      }

      setFilteredData(data);
    };

    searchAndFilterOrders();
  }, [searchTerm, filterStatus, orderData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

 

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/order/update/${editOrder}`, newOrder);
      toast.success('Order updated successfully');
      setIsPopupOpen(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating order:', error.response?.data || error.message);
      toast.error('Failed to update order');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/order/delete/${orderId}`);
      toast.success('Order deleted successfully');
      setOrderData(orderData.filter(order => order._id !== orderId)); 
      setFilteredData(filteredData.filter(order => order._id !== orderId)); 
    } catch (error) {
      console.error('Error deleting order:', error.response?.data || error.message);
      toast.error('Failed to delete order');
    }
  };
  const handleExportToExcel = () => {
    try {
      const exportData = filteredData.map(order => ({
        Date: order.date,
        'Sales Channel': order.storeName,
        Destination: order.destination,
        Items: order.items,
        Status: order.status
      }));

      
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      const columnWidths = [
        { wch: 15 }, 
        { wch: 20 }, 
        { wch: 15 }, 
        { wch: 25 }, 
        { wch: 10 }, 
        { wch: 12 }  
      ];
      worksheet['!cols'] = columnWidths;

      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      
      const data = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      
      const fileName = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      saveAs(data, fileName);
      
      toast.success('Orders exported successfully');
    } catch (error) {
      console.error('Error exporting orders:', error);
      toast.error('Failed to export orders');
    }
  };
  const highStockProducts = filteredData.filter((order) => Number(order.items) < 3);


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
  
      <div className="flex-1 p-6">
        {/* Header */}
        <Header title="" user="user" />
  
        <div className="p-6">
          {/* Page title and buttons */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">Stock Management</h1>
            <div className="flex gap-3">
              <button
                onClick={handleExportToExcel}
                className="px-4 py-2 border rounded-lg text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Export to Excel
              </button>
              {/* Notification Icon */}
              <div className="relative">
  <button
    onClick={() => setIsNotifOpen(!isNotifOpen)}
    className="relative focus:outline-none"
  >
    <Bell className="w-6 h-6 text-gray-700 hover:text-black" />
    {highStockProducts.length > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
        {highStockProducts.length}
      </span>
    )}
  </button>

  {/* Notification Dropdown */}
  {isNotifOpen && (
    <div className="absolute right-0 top-auto mt-20 w-64 bg-white shadow-lg rounded-lg p-5">
    <h3 className="text-sm font-bold text-gray-700 mb-2">Products in Stock</h3>
      {highStockProducts.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {highStockProducts.map((product) => (
            <li key={product._id} className="py-2 text-sm text-gray-600">
              {product.product} - {product.items} items
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No products in stock.</p>
      )}
    </div>
  )}
</div>
            </div>
          </div>
  
          {/* Search, Filter, and Calendar */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search order ID or product"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Calendar className="w-5 h-5 text-gray-600" />
              </button>
              <select
                className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        
          {/* Order table */}
<div className="bg-white rounded-lg border">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="w-8 p-4">
            <input type="checkbox" className="rounded" />
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
          
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Store Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Items</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {loading ? (
          <tr>
            <td colSpan="8" className="text-center py-4">Loading...</td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan="8" className="text-center py-4 text-red-500">{error}</td>
          </tr>
        ) : (
          filteredData.map((order, index) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="w-8 p-4">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.storeName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={Number(order.items) < 3 ? 'text-red-500' : ''}>
                  {order.items}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed'
                      ? 'bg-green-100 text-green-600'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <button onClick={() => {
                  setNewOrder(order);
                  setEditOrder(order._id);
                  setIsPopupOpen(true);
                }}>
                  <Pencil className="w-5 h-5 text-gray-500 hover:text-black-700" />
                </button>
                <button onClick={() => handleDeleteOrder(order._id)} className="ml-4">
                  <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
</div>
</div>



      <ToastContainer 
        position="bottom-right" 
        autoClose={10000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />

      {/* Popup for Add/Edit Order */}
      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-hidden">
      <h2 className="text-xl mb-4">{editOrder ? 'Edit Order' : 'Add Order'}</h2>
      <div className="overflow-y-auto max-h-[60vh]"> {/* Add this to make the form scrollable */}
        <form onSubmit={editOrder ? handleUpdateOrder : handleUpdateOrder}>
         
           
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={newOrder.category}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Product</label>
            <input
              type="text"
              name="product"
              value={newOrder.product}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={newOrder.storeName}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
         
          <div className="mb-4">
  <label className="block mb-1">Items</label>
  <input
    type="number"
    name="items"
    value={newOrder.items}
    onChange={handleInputChange}
    className={`border rounded p-2 w-full ${Number(newOrder.items) < 3 ? 'text-red-500' : ''}`}
    required
    min="1"
  />
</div>

         
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editOrder ? 'Update Order' : 'Add Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Stock;