import React from "react";
import { FaHeart, FaLeaf, FaSun } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-5 mt-10 border-t border-pink-200">
      <div className="flex flex-col items-center text-gray-700">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <FaLeaf className="text-green-500 animate-pulse" />
          <span>To-do List của Vanhhh 🌸</span>
          <FaSun className="text-yellow-400 animate-spin-slow" />
        </div>
        <p className="text-sm flex items-center gap-1">
          Made with <FaHeart className="text-red-500 animate-bounce" /> by Vanhhh — 2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
