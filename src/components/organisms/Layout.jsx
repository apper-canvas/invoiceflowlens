import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const outletContext = {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleMobileMenuToggle,
    handleMobileMenuClose,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
      
      <div className="lg:ml-80">
        <Header onMobileMenuToggle={handleMobileMenuToggle} />
        <main className="min-h-screen">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
};

export default Layout;