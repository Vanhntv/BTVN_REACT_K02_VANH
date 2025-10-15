import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50 text-gray-800">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LayoutClient;