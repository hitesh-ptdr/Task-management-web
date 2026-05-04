import React from "react";
import "../Styles/DeveloperTaskCard.css";

const DeveloperTaskCard = ({ task }) => {
  const statusClass =
    task.status === "Pending"
      ? "pending"
      : task.status === "In-Progress"
      ? "inprogress"
      : "completed";

  return (
    <div className={`task-card ${statusClass}`}>
      <div className="task-top">
        <h3>{task.title}</h3>
        <span className={`status-badge ${statusClass}`}>
          {task.status}
        </span>
      </div>

      <p className="task-desc">
        {task.description || "No description"}
      </p>

      <div className="task-info">
        <span>Deadline</span>
        <strong>
          {new Date(task.deadline).toLocaleString()}
        </strong>
      </div>
    </div>
  );
};

export default DeveloperTaskCard;