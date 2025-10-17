import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodos, removeTodo } from "../../../api/apiTodos";

const ManageTodos = () => {
  const [tasks, setTasks] = useState([]);

  const getStatus = (todo) => {
    const today = new Date();
    const due = new Date(todo.dueDate);
    if (todo.completed) return "Hoàn thành";
    return due < today ? "Quá hạn" : "Đang làm";
  };

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      setTasks(data || []);
    } catch (err) {
      console.error("Không thể tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleRemove = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa công việc này không?")) return;
    try {
      await removeTodo(id);
      alert("Xóa thành công!");
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi xóa công việc!");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-pink-50 min-h-screen rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-700">Quản lý công việc</h1>
        <Link
          to="/admin/todos/add"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
        >
          + Thêm công việc
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left border border-pink-200">
          <thead className="bg-pink-100 text-pink-800">
            <tr>
              <th className="px-4 py-3">Tên công việc</th>
              <th className="px-4 py-3">Ưu tiên</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Hạn chót</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  Không có công việc nào
                </td>
              </tr>
            ) : (
              tasks.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-pink-50 transition"
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-2">
                    {item.priority === 1
                      ? "Thấp"
                      : item.priority === 2
                      ? "Trung bình"
                      : "Cao"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        getStatus(item) === "Hoàn thành"
                          ? "bg-green-100 text-green-700"
                          : getStatus(item) === "Quá hạn"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {getStatus(item)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {item.dueDate
                      ? new Date(item.dueDate).toLocaleDateString("vi-VN")
                      : "..."}
                  </td>
                  <td className="px-4 py-2 truncate max-w-xs">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <Link
                      to={`/admin/todos/update/${item._id}`}
                      className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTodos;
