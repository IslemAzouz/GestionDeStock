import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  

  const inventoryData = [
    { orderId: "#7676", product: "Inverter", category: "cat1", salesChannel: "Store name", instruction: "Stock adjustment", items: "80/100", status: "Completed" },
    { orderId: "#7676", product: "Battery", category: "cat2", salesChannel: "Store name", instruction: "", items: "80/100", status: "Pending" },
    { orderId: "#7676", product: "Generator", category: "cat2", salesChannel: "Store name", instruction: "Stock adjustment", items: "80/100", status: "Completed" },
    { orderId: "#7676", product: "Charger", category: "cat3", salesChannel: "Store name", instruction: "Stock adjustment", items: "80/100", status: "Completed" },
    { orderId: "#7676", product: "Power", category: "cat4", salesChannel: "Store name", instruction: "", items: "80/100", status: "Completed" },
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
          { name: 'Dashboard', icon: 'grid', to: '/dashboard' },
          { name: 'In Stock', icon: 'box' , to: '/Stock'},
          { name: 'Sales', icon: 'trending-up' },
          { name: 'Orders', icon: 'shopping-cart' , to: '/orders'},
          { name: 'Users', icon: 'users' }
        ].map((item) => (
          <button
            key={item.name}
            className="p-2 rounded hover:bg-purple-700 flex flex-col items-center text-xs"
            onClick={() => {
              if (item.name === 'Dashboard') {
                navigate(item.to);
              }
              if (item.name === 'Orders') {
                navigate(item.to);
              }
              if (item.name === 'In Stock') {
                navigate(item.to);
              }
            }}
          >
            <div className="w-6 h-6 mb-1 bg-purple-400 rounded" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4" />
            <h1 className="text-xl font-semibold text-blue-600">In stock</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6" />
            <div className="flex items-center gap-2">
              <img src="/api/placeholder/32/32" alt="User avatar" className="w-8 h-8 rounded-full" />
              <span className="font-medium">Ann Lee</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
       
            {/* Actions Row */}
            <div className="flex justify-between mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Quick search"
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <input type="date" className="border rounded-md px-3 py-2" />
                <select className="border rounded-md px-3 py-2">
                  <option>Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  + New Stock
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="w-8 p-3"><input type="checkbox" /></th>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Sales channel</th>
                    <th className="p-3 text-left">Instruction</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3">{item.orderId}</td>
                      <td className="p-3">{item.product}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.salesChannel}</td>
                      <td className="p-3">{item.instruction}</td>
                      <td className="p-3">{item.items}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          item.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        
        </div>
      </div>
    </div>
  );
};

export default Stock;