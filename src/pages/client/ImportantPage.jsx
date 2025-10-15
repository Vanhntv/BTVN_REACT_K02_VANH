import React, { useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem";

const ImportantPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await fetch(
        "https://api-class-o1lo.onrender.com/api/v1/todos"
      );
      const { data } = await res.json();
      console.log(data);
      const importantTasks = data.filter(
        (task) => task.priority === 3 || task.priority?.level === 3
      );
      console.log(importantTasks);

      setTodos(importantTasks);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi fetch dữ liệu:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading)
    return (
      <div>
        Đang tải công việc quan trọng...
      </div>
    );

  return (
    <div>
      <h1>
        Công Việc Quan Trọng
      </h1>

      {todos.length === 0 ? (
        <div>
          Không có công việc quan trọng nào.
        </div>
      ) : (
        <div>
          {todos.map((task) => (
            <div
              key={task._id}
            >
              <TodoItem task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImportantPage;