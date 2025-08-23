import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "../Styles/DeveloperDashboard.css";

const DeveloperDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch tasks assigned to developer
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/developers/tasks"); // interceptor will add devToken
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    const devToken = localStorage.getItem("devToken");
    const isDevLoggedIn = localStorage.getItem("isDevLoggedIn");

    if (!devToken || isDevLoggedIn !== "true") {
      navigate("/developer/login");
      return;
    }

    const verifyDeveloperToken = async () => {
      try {
        const res = await axios.get("/developers/verify"); // interceptor adds devToken

        if (res.data && res.data.developer) {
          fetchTasks();
        } else {
          localStorage.removeItem("devToken");
          localStorage.removeItem("isDevLoggedIn");
          navigate("/developer/login");
        }
      } catch (err) {
        console.error("Token invalid or developer not found", err);
        localStorage.removeItem("devToken");
        localStorage.removeItem("isDevLoggedIn");
        navigate("/developer/login");
      }
    };

    verifyDeveloperToken();
  }, [navigate]);

  const pending = tasks.filter((t) => t.status === "Pending");
  const progress = tasks.filter((t) => t.status === "In-Progress");
  const completed = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="developer-dashboard-container">
      <main className="main-content">
        <h1 className="table-title">Developer Dashboard</h1>

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
        <h2 className="table-title" style={{ marginTop: "2rem" }}>Today's Pending Tasks</h2>
        {pending.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "gray" }}>
            No pending tasks assigned.
          </p>
        ) : (
          <table className="pending-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task Id</th>
                <th>Task</th>
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

export default DeveloperDashboard;
