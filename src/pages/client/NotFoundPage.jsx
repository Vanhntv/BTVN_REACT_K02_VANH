import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaSadTear } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <FaSadTear className="text-6xl text-pink-400 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Không tìm thấy trang 🌸</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Oo! Có vẻ như bạn đã lạc vào khu vườn không có nhiệm vụ nào cả.  
        Hãy quay về trang chính để tiếp tục hoàn thành công việc nhé 
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md transition-all duration-300"
      >
        Quay lại trang chủ
      </button>

      <FaLeaf className="text-green-400 text-3xl mt-6 animate-pulse" />
    </div>
  );
};

export default NotFoundPage;