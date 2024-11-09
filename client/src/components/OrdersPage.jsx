import React from 'react';
import { Menu, Search, Bell, ChevronDown, Calendar, Filter } from "lucide-react";

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
  {
    id: '#7676',
    date: '06/30/2022',
    customer: 'Ramesh Chaudhary',
    salesChannel: 'Store name',
    destination: 'Lalitpur',
    items: 3,
    status: 'Pending'
  },
  {
    id: '#7676',
    date: '06/30/2022',
    customer: 'Ramesh Chaudhary',
    salesChannel: 'Store name',
    destination: 'Lalitpur',
    items: 3,
    status: 'Completed'
  },
  {
    id: '#7676',
    date: '06/30/2022',
    customer: 'Ramesh Chaudhary',
    salesChannel: 'Store name',
    destination: 'Lalitpur',
    items: 3,
    status: 'Completed'
  },
  {
    id: '#7676',
    date: '06/30/2022',
    customer: 'Ramesh Chaudhary',
    salesChannel: 'Store name',
    destination: 'Lalitpur',
    items: 3,
    status: 'Completed'
  }
];

const OrdersPage = () => {
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
              <span className="text-sm">user</span>
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
              <button className="px-4 py-2 border rounded-lg text-purple-600 border-purple-600 hover:bg-purple-50">
                Export to excel
              </button>
              <button className="px-4 py-2 border rounded-lg text-purple-600 border-purple-600 hover:bg-purple-50">
                Import Orders
              </button>
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                + New Orders
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search order ID"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Calendar className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  Sales
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  Status
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  Filter
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* FORM */}
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
      </div>
    </div>
  );
};

export default OrdersPage;