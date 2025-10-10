import React from "react";

const TodoItem = ({ task }) => {
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
          <b>Hạn chót:</b> {new Date(task.dueDate).toLocaleDateString("vi-VN")}
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
    </div>
  );
};

export default TodoItem;
