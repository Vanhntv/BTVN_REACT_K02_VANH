import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({});
  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    _page: 1,
    _limit: 8,
    _sort: "priority",
    _order: "desc",
  });

  const loadTasks = async () => {
    try {
      const queryString = Object.entries(params)
        .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
        .map(([k, v]) => `${k}=${v}`)
        .join("&");

      const res = await fetch(
        `https://api-class-o1lo.onrender.com/api/v1/todos?${queryString}`
      );
      const json = await res.json();

      setTasks(json.data || []);
      setMeta(json.meta || {});
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [params]);

  const statusText = (todo) => {
    const today = new Date();
    const deadline = new Date(todo.dueDate);
    if (todo.completed) return "Hoàn thành";
    return deadline < today ? "Quá hạn" : "Đang làm";
  };

  const filterPriority = (value) => {
    setParams((p) => ({ ...p, priority: value || null, _page: 1 }));
  };

  const changePage = (p) => {
    setParams((prev) => ({ ...prev, _page: p }));
  };

  return (
    <div className="todo-container">
      <h1>To-do List Của Vanhhh</h1>

      <div className="toolbar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Nhập từ khóa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setParams((p) => ({ ...p, q: search, _page: 1 }));
              }
            }}
          />
          <button
            onClick={() => setParams((p) => ({ ...p, q: search, _page: 1 }))}
          >
            Tìm kiếm
          </button>
        </div>

        <div className="filters">
          <select onChange={(e) => filterPriority(e.target.value)}>
            <option value="">Tất cả ưu tiên</option>
            <option value="1">Thấp</option>
            <option value="2">Trung bình</option>
            <option value="3">Cao</option>
          </select>

          <select
            onChange={(e) =>
              setParams((p) => ({
                ...p,
                _sort: "priority",
                _order: e.target.value || "desc",
              }))
            }
          >
            <option value="">Sắp xếp</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {/* Danh sách */}
      <div className="todo-list">
        {tasks.length ? (
          tasks.map((t) => <TodoItem key={t._id} task={t} />)
        ) : (
          <p>Không có công việc nào.</p>
        )}
      </div>

      {/* Phân trang */}
      {meta.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => meta.page > 1 && changePage(meta.page - 1)}
            disabled={meta.page === 1}
          >
            ⬅
          </button>
          {Array.from({ length: meta.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={meta.page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              meta.page < meta.totalPages && changePage(meta.page + 1)
            }
            disabled={meta.page === meta.totalPages}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
