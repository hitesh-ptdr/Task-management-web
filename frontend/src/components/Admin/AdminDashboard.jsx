// src/components/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async (token) => {
    try {
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (!token || isAdminLoggedIn !== "true") {
      navigate("/admin/login");
      return;
    }

    const verifyAdminToken = async () => {
      try {
        const res = await axios.get("/admin/verify-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.admin) {
          fetchTasks(token);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("isAdminLoggedIn");
          navigate("/admin/login");
        }
      } catch (err) {
        console.error("Token invalid or admin not found", err);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/admin/login");
      }
    };

    verifyAdminToken();
  }, [navigate]);

  // Case-insensitive status filtering
  const pending = tasks.filter((t) => t.status?.toLowerCase() === "pending");
  const progress = tasks.filter((t) => t.status?.toLowerCase() === "in-progress");
  const completed = tasks.filter((t) => t.status?.toLowerCase() === "completed");

  return (
    <div className="admin-dashboard-container">
      <main className="main-content">
        <div className="task-summary">
          <div className="task-box pending">
            <h3>Pending Tasks</h3>
            <p>{pending.length}</p>
          </div>
          <div className="task-box in-progress">
            <h3>In-Progress Tasks</h3>
            <p>{progress.length}</p>
          </div>
          <div className="task-box completed">
            <h3>Completed Tasks</h3>
            <p>{completed.length}</p>
          </div>
        </div>

        {/* Pending Tasks Table */}
        <h2 className="table-title" style={{ marginTop: "2rem" }}>
          Today's Pending Tasks
        </h2>
        {pending.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "gray" }}>
            No pending tasks found.
          </p>
        ) : (
          <table className="pending-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task Id</th>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Date/Time</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task._id}</td>
                  <td>{task.title}</td>
                  <td>{task.assignedTo ? task.assignedTo.name : "N/A"}</td>
                  <td>{new Date(task.datetime).toLocaleString()}</td>
                  <td>{new Date(task.deadline).toLocaleString()}</td>
                  <td className="pending-status">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

    


