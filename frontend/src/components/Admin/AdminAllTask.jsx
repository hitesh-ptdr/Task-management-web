import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../styles/AdminAllTask.css";

const AdminAllTask = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // refresh list
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err);
    }
  };

  return (
    <div className="admin-task-container">
      <h2>📋 All Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-task-msg">No tasks assigned yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id}>
                  <td>{idx + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.developer?.name || "N/A"}</td>
                  <td>
                    <span className={`status-badge ${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllTask;
