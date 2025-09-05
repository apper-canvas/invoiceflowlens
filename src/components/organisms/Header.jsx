import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onMobileMenuToggle, title = "Dashboard" }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <ApperIcon name="Menu" size={24} />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar
            placeholder="Search invoices, clients..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="hidden md:block w-80"
          />
          
          <Button variant="outline" size="medium" className="hidden sm:flex">
            <ApperIcon name="Download" size={18} className="mr-2" />
            Export
          </Button>
          
          <Button variant="primary" size="medium">
            <ApperIcon name="Plus" size={18} className="mr-2" />
            New Invoice
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;