import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {  useLocation } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header'; // Import the Header component
import axios from 'axios';

const chartData = [
  { month: 'Jan', value1: 300, value2: 250 },
  { month: 'Feb', value1: 200, value2: 300 },
  { month: 'Mar', value1: 200, value2: 300 },
  { month: 'Apr', value1: 180, value2: 300 },
];

const MetricCard = ({ title, amount }) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="p-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-gray-100">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" className="fill-gray-300" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-center gap-1">
            <span className="text-green-500">+</span>
            <span className="text-2xl font-semibold">{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const location = useLocation();

  const [totalStock, setTotalStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const role = location.state?.role; // Get role from location state
  console.log("AdminDashboard role:", role); // Debugging line



  useEffect(() => {
    // Fetch Total Stock
    axios.get('http://localhost:4000/order/status/Completed')
      .then(response => setTotalStock(response.data.length))
      .catch(error => console.error('Error fetching total stock:', error));

    // Fetch Total Sales
    axios.get('http://localhost:4000/sales')
      .then(response => setTotalSales(response.data.length))
      .catch(error => console.error('Error fetching total sales:', error));

    // Fetch Total Orders
    axios.get('http://localhost:4000/order')
      .then(response => setTotalOrders(response.data.length))
      .catch(error => console.error('Error fetching total orders:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <Header title="Dashboard" user="user" /> {/* Pass props to Header */}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-6">
            <MetricCard title="Total Stock" amount={totalStock} />
            <MetricCard title="Total Sales" amount={totalSales} />
            <MetricCard title="Total Orders" amount={totalOrders} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="value1" fill="#FFD700" />
                  <Bar dataKey="value2" fill="#4169E1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Top Selling Products</h2>
              </div>
              <div className="p-4">
                <div className="w-full h-48 bg-[#1a1f37] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;