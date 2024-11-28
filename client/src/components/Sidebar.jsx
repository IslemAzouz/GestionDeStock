import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";


const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <RxDashboard className='w-6 h-6'/> },
    { name: 'In Stock', path: '/Stock', icon: <CiDeliveryTruck className="w-6 h-6" /> },
    { name: 'Sales', path: '/sales', icon: <FaCoins className="w-6 h-6" /> },
    { name: 'Orders', path: '/orders', icon: <MdOutlineReceiptLong className="w-6 h-6" /> },
    { name: 'Users', path: '#', icon: <FaUsers className="w-6 h-6" /> },
  ];

  return (
    <div className="w-20 min-h-screen bg-purple-600 text-white">
      <div className="p-4">
        <Menu className="w-6 h-6" />
      </div>
      <nav className="flex flex-col gap-4 p-2">
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <button className="p-2 rounded hover:bg-white hover:text-purple-600 flex flex-col items-center text-xs">
              <div className="w-6 h-6 mb-1">
                {item.icon}
              </div>
              {item.name}
            </button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
