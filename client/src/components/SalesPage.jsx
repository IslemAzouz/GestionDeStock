import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, Trash2, Plus, Pencil } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Sidebar from './Sidebar';
import Header from './Header';

import {  useLocation } from 'react-router-dom';


const SalesPage = () => {
  
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: '',
    product: '',
    quantity: '',
    price: '',
    totalAmount: '',
  });
  const role = localStorage.getItem("role");
  console.log("Role: ", role);



  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sales/');
      setSalesData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sales data');
      setLoading(false);
    }
  };

  useEffect(() => {
    const filterSales = () => {
      const data = searchTerm
        ? salesData.filter((sale) =>
            sale.product.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : salesData;

      setFilteredData(data);
    };

    filterSales();
  }, [searchTerm, salesData]);

  // Calculate total amount whenever quantity or price changes
  useEffect(() => {
    if (newSale.quantity && newSale.price) {
      const totalAmount = newSale.quantity * newSale.price;
      setNewSale((prevSale) => ({
        ...prevSale,
        totalAmount,
      }));
    }
  }, [newSale.quantity, newSale.price]);

  const handleSaveSale = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:4000/sales/update/${newSale._id}`,
          newSale
        );
        toast.success('Sale updated successfully');
      } else {
        await axios.post('http://localhost:4000/sales/add', newSale);
        toast.success('Sale added successfully');
      }
      setShowModal(false);
      setNewSale({ customer: '', product: '', quantity: '', price: '', totalAmount: '' });
      fetchSales();
    } catch (error) {
      console.error('Error saving sale:', error);
      toast.error('Failed to save sale');
    }
  };

  const openModal = (sale) => {
    if (sale) {
      setEditMode(true);
      setNewSale(sale);
    } else {
      setEditMode(false);
      setNewSale({ customer: '', product: '', quantity: '', price: '', totalAmount: '' });
    }
    setShowModal(true);
  };

  const handleDeleteSale = async (saleId) => {
    try {
      await axios.delete(`http://localhost:4000/sales/delete/${saleId}`);
      setSalesData((prev) => prev.filter((sale) => sale._id !== saleId));
      setFilteredData((prev) => prev.filter((sale) => sale._id !== saleId));
      toast.success('Sale deleted successfully');
    } catch (error) {
      console.error('Error deleting sale:', error);
      toast.error('Failed to delete sale');
    }
  };

  const handleExportToExcel = () => {
    try {
      const exportData = filteredData.map((sale) => ({
        Customer: sale.customer || '',
        Product: sale.product || '',
        Quantity: sale.quantity || 0,
        Price: sale.price || 0,
        Total: sale.totalAmount || 0,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(data, `sales_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Sales exported successfully');
    } catch (error) {
      console.error('Error exporting sales:', error);
      toast.error('Failed to export sales');
    }
  };

  return (
    <div className="flex min-h-screen">
      
      <div className="flex-1 p-6">
          {/* Header */}
          <Header title="Sales" user="user" /> {/* Pass props to Header */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <ToastContainer />
        <div className="flex items-center justify-between p-6 bg-white shadow">
      
          
          <button
            onClick={() => openModal()}
            className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 flex items-center"
          >
            <Plus className="mr-2" /> Add Sale
          </button>
          <button 
                onClick={handleExportToExcel}
                className="px-4 py-2 border rounded-lg text-purple-600 border-purple-600 hover:bg-purple-50">
                  Export to Excel
              </button>
        </div>

        <div className="flex gap-4 p-6 bg-white">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full table-auto border-collapse bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">Customer</th>
                <th className="p-4 text-left text-sm font-semibold">Product</th>
                <th className="p-4 text-left text-sm font-semibold">Quantity</th>
                <th className="p-4 text-left text-sm font-semibold">Price</th>
                <th className="p-4 text-left text-sm font-semibold">Total</th>
                <th className="p-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                filteredData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-gray-50">
                    <td className="p-4">{sale.customer}</td>
                    <td className="p-4">{sale.product}</td>
                    <td className="p-4">{sale.quantity}</td>
                    <td className="p-4">{sale.price}</td>
                    <td className="p-4">{sale.totalAmount}</td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(sale)}>
                        <Pencil className="w-5 h-5 text-gray-500 hover:text-black-700" />
                       
                      </button>
                      <button
                        onClick={() => handleDeleteSale(sale._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                {editMode ? 'Edit Sale' : 'Add New Sale'}
              </h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  className="px-4 py-2 border rounded"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
                  placeholder="Customer"
                />
                <input
                  type="text"
                  className="px-4 py-2 border rounded"
                  value={newSale.product}
                  onChange={(e) => setNewSale({ ...newSale, product: e.target.value })}
                  placeholder="Product"
                />
                <input
                  type="number"
                  className="px-4 py-2 border rounded"
                  value={newSale.quantity}
                  onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  className="px-4 py-2 border rounded"
                  value={newSale.price}
                  onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
                  placeholder="Price"
                />
                <div className="p-2">
                  Total: {newSale.totalAmount}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleSaveSale}
                >
                  {editMode ? 'Save Changes' : 'Add Sale'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default SalesPage;