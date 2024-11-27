import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, Calendar, Trash2, Pencil } from "lucide-react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Fetch Sales Data
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

  // Search and Filter Logic
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

  // Delete Sale
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

  // Export to Excel
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sales</h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 border rounded-lg text-purple-600 border-purple-600 hover:bg-purple-50">
            Export to Excel
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or date"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2 border rounded-lg hover:bg-gray-50">
          <Calendar className="w-5 h-5 text-gray-600" />
        </button>
        <input
          type="date"
          className="px-4 py-2 border rounded-lg"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">{error}</td>
                </tr>
              ) : (
                filteredData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handleDeleteSale(sale._id)}
                        className="text-red-500 hover:text-red-700"
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
      </div>
    </div>
  );
};

export default SalesPage;
