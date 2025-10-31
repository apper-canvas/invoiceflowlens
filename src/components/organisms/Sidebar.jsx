import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/layouts/Root";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Invoices", href: "/invoices", icon: "FileText" },
    { name: "Transactions", href: "/transactions", icon: "CreditCard" },
    { name: "Clients", href: "/clients", icon: "Users" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
            <ApperIcon name="Receipt" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              InvoiceFlow
            </h1>
            <p className="text-xs text-gray-500">Professional Billing</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md transform scale-105"
                  : "text-gray-700 hover:text-primary-600 hover:bg-primary-50 hover:transform hover:translate-x-1"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon 
                  name={item.icon} 
                  size={20} 
                  className={cn(
                    "mr-3 transition-colors",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-75" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

{/* Bottom section */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Business Owner</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
          <button
onClick={logout}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <ApperIcon name="LogOut" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
{/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div 
          className={cn(
            "absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 z-40">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;