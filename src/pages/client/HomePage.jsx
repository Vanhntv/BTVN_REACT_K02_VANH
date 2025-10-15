import { useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem";

const HomePage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
  });

  const [params, setParams] = useState({
    _page: 1,
    _limit: 8,
    _sort: "priority",
    _order: "desc",
    q: "",
    priority: "",
    status: "",
  });

  const loadAllTasks = async () => {
    try {
      const res = await fetch("https://api-class-o1lo.onrender.com/api/v1/todos");
      const json = await res.json();
      setAllTasks(json.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    loadAllTasks();
  }, []);

  const getStatus = (todo) => {
    const today = new Date();
    const due = new Date(todo.dueDate);
    if (todo.completed) return "Hoàn thành";
    return due < today ? "Quá hạn" : "Đang làm";
  };

  useEffect(() => {
    let filtered = [...allTasks];

    if (params.q) {
      const keyword = params.q.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      );
    }

    if (params.priority) {
      filtered = filtered.filter(
        (t) => String(t.priority) === String(params.priority)
      );
    }

    if (params.status) {
      filtered = filtered.filter((t) => getStatus(t) === params.status);
    }

    filtered.sort((a, b) => {
      const order = params._order === "asc" ? 1 : -1;
      return (a[params._sort] - b[params._sort]) * order;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / params._limit);
    const start = (params._page - 1) * params._limit;
    const paginated = filtered.slice(start, start + params._limit);

    setTasks(paginated);
    setMeta({ totalItems, totalPages, page: params._page });
  }, [allTasks, params]);

  const changePage = (p) => {
    setParams((prev) => ({ ...prev, _page: p }));
  };

  const resetFilters = () => {
    setParams({
      _page: 1,
      _limit: 8,
      _sort: "priority",
      _order: "desc",
      q: "",
      priority: "",
      status: "",
    });
    setSearch("");
    document.querySelectorAll("select").forEach((s) => (s.value = ""));
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
          <select onChange={(e) =>
            setParams((p) => ({ ...p, priority: e.target.value || "", _page: 1 }))
          }>
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

          <select
            onChange={(e) =>
              setParams((p) => ({ ...p, status: e.target.value || "", _page: 1 }))
            }
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Đang làm">Đang làm</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Quá hạn">Quá hạn</option>
          </select>

          {(params.q || params.priority || params.status) && (
            <button onClick={resetFilters} className="reset-btn">
              Làm mới
            </button>
          )}
        </div>
      </div>

      <div className="todo-list">
        {tasks.length ? (
          tasks.map((t) => (
            <TodoItem key={t._id} task={{ ...t, status: getStatus(t) }} />
          ))
        ) : (
          <p>Không có công việc nào.</p>
        )}
      </div>

      {meta.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => meta.page > 1 && changePage(meta.page - 1)}
            disabled={meta.page === 1}
          >
            Prev
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
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;