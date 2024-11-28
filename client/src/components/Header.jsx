import React from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

const Header = ({ title, onSearch, searchTerm, user }) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>
      
        <button className="p-2 relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <span className="text-sm">{user}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      
    </header>
  );
};

export default Header;
