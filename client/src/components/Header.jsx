import React from "react";
import { Menu, ChevronDown } from "lucide-react";

const Header = ({ title, user }) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b">
      {/* Left Section: Menu Button and Title */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>

      {/* Right Section: User Info */}
      <div className="flex items-center gap-2">
        <span className="text-sm">
          Welcome, {user.username || user.firstName}!
        </span>
      </div>
    </header>
  );
};

export default Header;
