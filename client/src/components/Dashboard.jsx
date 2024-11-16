import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const chartData = [
  { month: 'Jan', value1: 300, value2: 250 },
  { month: 'Feb', value1: 200, value2: 300 },
  { month: 'Mar', value1: 200, value2: 300 },
  { month: 'Apr', value1: 180, value2: 300 },
];

const stockAlertData = [
  { orderId: 'order ID', date: 'Date', quantity: 'Quantity', alertAmt: 'Alert amt.', status: 'Status' },
  { orderId: 'order ID', date: 'Date', quantity: 'Quantity', alertAmt: 'Alert amt.', status: 'Status' },
  { orderId: 'order ID', date: 'Date', quantity: 'Quantity', alertAmt: 'Alert amt.', status: 'Status' },
  { orderId: 'order ID', date: 'Date', quantity: 'Quantity', alertAmt: 'Alert amt.', status: 'Status' },
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
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 min-h-screen bg-[#1a1f37] text-white">
          <div className="p-4">
            <Menu className="w-6 h-6" />
          </div>
          <nav className="flex flex-col gap-4 p-2">
  {['Dashboard', 'In Stock', 'Sales', 'Orders', 'Users'].map((item) => {
    let path = '#'; // Default path
    if (item === 'In Stock') path = '/Stock';
    if (item === 'Orders') path = '/orders';

    return (
      <Link key={item} to={path}>
        <button className="p-2 rounded hover:bg-[#2a2f47] flex flex-col items-center text-xs">
          <div className="w-6 h-6 mb-1 bg-gray-600 rounded" />
          {item}
        </button>
      </Link>
    );
  })}
</nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-200">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" className="fill-gray-400" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <span>user</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Revenue" amount={30000} />
            <MetricCard title="Sales Return" amount={30000} />
            <MetricCard title="Purchase" amount={30000} />
            <MetricCard title="Income" amount={30000} />
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
                <h2 className="text-lg font-semibold">Top selling Products</h2>
              </div>
              <div className="p-4">
                <div className="w-full h-48 bg-[#1a1f37] rounded-full" />
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Stock Alert</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">Order ID</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Alert amt.</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockAlertData.map((row, index) => (
                        <tr key={index} className="text-gray-600">
                          <td className="p-2">{row.orderId}</td>
                          <td className="p-2">{row.date}</td>
                          <td className="p-2">{row.quantity}</td>
                          <td className="p-2">{row.alertAmt}</td>
                          <td className="p-2">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Top selling Products</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">Order ID</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Alert amt.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockAlertData.map((row, index) => (
                        <tr key={index} className="text-gray-600">
                          <td className="p-2">{row.orderId}</td>
                          <td className="p-2">{row.quantity}</td>
                          <td className="p-2">{row.alertAmt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;