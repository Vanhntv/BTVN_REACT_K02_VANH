import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, updateTodo, getTodoDetail } from "../../../api/apiTodos";

const TodoForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  const defaultState = {
    name: "",
    priority: 1,
    description: "",
    dueDate: "",
    completed: false,
  };
  const [values, setValues] = useState(defaultState);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await getTodoDetail(id);
        const formattedDate = data.dueDate
          ? new Date(data.dueDate).toISOString().split("T")[0]
          : "";
        setValues({ ...data, dueDate: formattedDate });
      } catch (err) {
        console.error("Không thể tải dữ liệu:", err);
      }
    })();
  }, [id]);

  const validate = useCallback((data) => {
    const { name, dueDate } = data;

    if (!name.trim()) {
      alert("Tên công việc không được để trống");
      return true;
    }

    if (name.length < 3 || name.length > 80) {
      alert("Tên công việc phải từ 3–80 ký tự!");
      return true;
    }

    if (!dueDate) {
      alert("Bạn chưa chọn hạn hoàn thành!");
      return true;
    }

    return false;
  }, []);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : name === "priority" ? +value : value,
    }));
  };

  const clearForm = () => setValues(defaultState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(values)) return;

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (id) {
        await updateTodo(id, values);
        alert("Cập nhật thành công");
      } else {
        await createTodo(values);
        alert("Tạo mới công việc thành công");
      }
      navigate("/admin/todos");
    } catch (err) {
      alert("Lỗi rồi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto my-10 bg-pink/200 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200">
      <header className="text-center mb-10">
        <h2 className="text-3xl font-bold text-pink-500">
          {id ? "Cập nhật công việc" : "Thêm công việc mới"}
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tên công việc
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Nhập tên công việc..."
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Mức độ ưu tiên
            </label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleInput}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              <option value={1}>Thấp</option>
              <option value={2}>Trung bình</option>
              <option value={3}>Cao</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Hạn chót hoàn thành
            </label>
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleInput}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {id && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                checked={values.completed}
                onChange={handleInput}
                className="w-5 h-5 accent-pink-500"
              />
              <span className="font-medium text-gray-700">Hoàn thành</span>
            </label>
          )}
        </div>

        <div className="space-y-6 flex flex-col">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Mô tả công việc
            </label>
            <textarea
              name="description"
              rows={8}
              value={values.description}
              onChange={handleInput}
              placeholder="Nhập mô tả chi tiết..."
              className="w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-auto">
            {!id && (
              <button
                type="button"
                onClick={clearForm}
                className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition-all"
              >
                Làm mới
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate("/admin/todos")}
              className="px-5 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-xl transition-all"
            >
              Quay lại
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-pink-500 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              {id ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;
