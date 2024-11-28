import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, Trash2, Plus } from "lucide-react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Sidebar from './Sidebar';

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newSale, setNewSale] = useState({ date: '', product: '', quantity: '', price: '' });

  useEffect(() => {
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

    fetchSales();
  }, []);

  useEffect(() => {
    const filterSales = () => {
      let data = salesData;

      if (searchTerm) {
        data = data.filter(sale =>
          sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.date.includes(searchTerm)
        );
      }

      if (filterDate) {
        data = data.filter(sale => sale.date === filterDate);
      }

      setFilteredData(data);
    };

    filterSales();
  }, [searchTerm, filterDate, salesData]);

  const handleAddSale = async () => {
    try {
      const response = await axios.post('http://localhost:4000/sales/add', newSale);
      setSalesData([...salesData, response.data]);
      setFilteredData([...filteredData, response.data]);
      toast.success('Sale added successfully');
      setNewSale({ date: '', product: '', quantity: '', price: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding sale:', error.response?.data || error.message);
      toast.error('Failed to add sale');
    }
  };

  const handleDeleteSale = async (saleId) => {
    try {
      await axios.delete(`http://localhost:4000/sales/delete/${saleId}`);
      toast.success('Sale deleted successfully');
      setSalesData(salesData.filter(sale => sale._id !== saleId));
      setFilteredData(filteredData.filter(sale => sale._id !== saleId));
    } catch (error) {
      console.error('Error deleting sale:', error.response?.data || error.message);
      toast.error('Failed to delete sale');
    }
  };

  const handleExportToExcel = () => {
    try {
      const exportData = filteredData.map(sale => ({
        Date: sale.date,
        Product: sale.product,
        Quantity: sale.quantity,
        Price: sale.price,
        Total: sale.total
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, `sales_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Sales exported successfully');
    } catch (error) {
      console.error('Error exporting sales:', error);
      toast.error('Failed to export sales');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <ToastContainer />

        <div className="flex items-center justify-between p-6 bg-white shadow">
          <h1 className="text-xl font-semibold">Sales</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 flex items-center"
          >
            <Plus className="mr-2" /> Add Sale
          </button>
        </div>

        <div className="flex gap-4 p-6 bg-white">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product or date"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="px-4 py-2 border rounded"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full table-auto border-collapse bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">Date</th>
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
                  <td colSpan="6" className="p-4 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-red-500">{error}</td>
                </tr>
              ) : (
                filteredData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-gray-50">
                    <td className="p-4">{sale.date}</td>
                    <td className="p-4">{sale.product}</td>
                    <td className="p-4">{sale.quantity}</td>
                    <td className="p-4">{sale.price}</td>
                    <td className="p-4">{sale.total}</td>
                    <td className="p-4">
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
              <h2 className="text-lg font-semibold mb-4">Add New Sale</h2>
              <div className="grid gap-4">
                <input
                  type="date"
                  className="px-4 py-2 border rounded"
                  value={newSale.date}
                  onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                  placeholder="Date"
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
                  onClick={handleAddSale}
                >
                  Add Sale
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
