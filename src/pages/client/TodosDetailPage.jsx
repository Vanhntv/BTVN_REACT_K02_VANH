import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const TodosDetailPage = () => {
  const { id } = useParams();
  const location = useLocation(); // 👈 lấy thông tin từ Link
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatus = (t) => {
    if (!t) return "";
    const today = new Date();
    const due = new Date(t.dueDate);
    if (t.completed) return "Hoàn thành";
    return due < today ? "Quá hạn" : "Đang làm";
  };

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api-class-o1lo.onrender.com/api/anhntv/todos/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Lỗi khi tải công việc");
      setTodo(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from); 
    } else {
      navigate("/todos"); 
    }
  };

  if (loading)
    return <p className="text-center text-pink-500 mt-10 animate-pulse">Đang tải dữ liệu...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Lỗi: {error}</p>;
  if (!todo)
    return <p className="text-center mt-10">Không tìm thấy công việc.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-pink-50 rounded-2xl shadow-lg p-8 border border-pink-100">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">
        {todo.name}
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-pink-600">Mô tả:</span> {todo.description}
        </p>
        <p>
          <span className="font-semibold text-pink-600">Trạng thái:</span> {getStatus(todo)}
        </p>
        <p>
          <span className="font-semibold text-pink-600">Mức ưu tiên:</span>{" "}
          <span
            className={
              todo.priority === 3
                ? "text-red-500 font-medium"
                : todo.priority === 2
                ? "text-yellow-500 font-medium"
                : "text-green-600 font-medium"
            }
          >
            {todo.priority === 1 ? "Thấp" : todo.priority === 2 ? "Trung bình" : "Cao"}
          </span>
        </p>
        <p>
          <span className="font-semibold text-pink-600">Hạn chót:</span>{" "}
          {new Date(todo.dueDate).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleBack}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default TodosDetailPage;