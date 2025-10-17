import React from "react";
import { Link, useLocation } from "react-router-dom";

const TodoItem = ({ task }) => {
  const location = useLocation();

  const getStatus = () => {
    if (task.completed) return "Hoàn thành";
    const today = new Date();
    const deadline = new Date(task.dueDate);
    return deadline < today ? "Quá hạn" : "Đang làm";
  };

  const getPriorityLabel = () => {
    if (task.priority === 3) return "Cao";
    if (task.priority === 2) return "Trung bình";
    return "Thấp";
  };

  const getPriorityClass = () => {
    if (task.priority === 3) return "high";
    if (task.priority === 2) return "medium";
    return "low";
  };

  const status = getStatus();

  return (
    <div
      className={`todo-card ${
        task.completed
          ? "done"
          : new Date(task.dueDate) < new Date()
          ? "overdue"
          : "in-progress"
      }`}
    >
      <h3>{task.name}</h3>
      <p className="desc">{task.description}</p>

      <div className="info">
        <span>
          <b>Ưu tiên:</b>{" "}
          <i className={`priority-${getPriorityClass()}`}>
            {getPriorityLabel()}
          </i>
        </span>
        <br />
        <span>
          <b>Hạn chót:</b>{" "}
          {new Date(task.dueDate).toLocaleDateString("vi-VN")}
        </span>
      </div>

      <p
        className={`status ${
          status.includes("Hoàn")
            ? "done"
            : status.includes("Quá")
            ? "overdue"
            : "in-progress"
        }`}
      >
        {status}
      </p>

      <Link
        to={`/todos/${task._id}`}
        state={{ from: location.pathname + location.search }} 
        style={{
          display: "inline-block",
          marginTop: 10,
          color: "#1976d2",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Xem Chi Tiết
      </Link>
    </div>
  );
};

export default TodoItem;