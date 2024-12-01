import React, { useEffect, useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 
import { RxDashboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verify if a valid token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <RxDashboard className='w-6 h-6'/> },
    { name: 'In Stock', path: '/Stock', icon: <CiDeliveryTruck className="w-6 h-6" /> },
    { name: 'Sales', path: '/sales', icon: <FaCoins className="w-6 h-6" /> },
    { name: 'Orders', path: '/orders', icon: <MdOutlineReceiptLong className="w-6 h-6" /> },
    { name: 'Users', path: '/users', icon: <FaUsers className="w-6 h-6" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="w-20 min-h-screen bg-purple-600 text-white">
      <div className="p-4">
        <Menu className="w-6 h-6" />
      </div>
      <nav className="flex flex-col gap-4 p-2">
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <button className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:text-purple-600 text-xs">
              <div className="w-6 h-6 mb-2">
                {item.icon}
              </div>
              {item.name}
            </button>
          </Link>
        ))}
        
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:text-purple-600 text-xs"
        >
          <div className="w-6 h-6 ">
            <LogOut className="w-6 h-6" />
          </div>
          Logout
        </button>
      
      </nav>
    </div>
  );
};

export default Sidebar;
