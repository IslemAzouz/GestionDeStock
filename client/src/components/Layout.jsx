import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Layout = ({ children }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Retrieve role from localStorage (or context/store if applicable)
    const userRole = localStorage.getItem('role'); 
    setRole(userRole);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Pass the role to Sidebar */}
      <Sidebar role={role} /> 
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
