import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "../Styles/AdminDashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  /* ===========================
     FETCH TASKS
  ============================ */
  const fetchTasks = async (token) => {
    try {
      const res = await axios.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log("Fetch task error:", error);
    }
  };

  /* ===========================
     AUTH + VERIFY
  ============================ */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔴 अगर token नहीं → login
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const verifyAdmin = async () => {
      try {
        const res = await axios.get("/admin/verify-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.admin) {
          fetchTasks(token);
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        console.log("Verify error:", error);
        navigate("/admin/login");
      }
    };

    verifyAdmin();

    // 🔁 auto refresh
    const interval = setInterval(() => {
      fetchTasks(token);
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  /* ===========================
     FILTERS
  ============================ */
  const pending = tasks.filter(
    (t) => t.status?.toLowerCase() === "pending"
  );

  const progress = tasks.filter(
    (t) => t.status?.toLowerCase() === "in-progress"
  );

  const completed = tasks.filter((t) =>
    t.status?.toLowerCase().includes("completed")
  );

  const overdue = tasks.filter(
    (t) =>
      new Date(t.deadline) < new Date() &&
      !t.status?.toLowerCase().includes("completed")
  );

  const urgentTasks = tasks.filter((t) => {
    const diff = new Date(t.deadline) - new Date();
    return (
      diff > 0 &&
      diff < 86400000 &&
      !t.status?.toLowerCase().includes("completed")
    );
  });

  const recentTasks = [...tasks].reverse().slice(0, 5);

  /* ===========================
     CHART DATA
  ============================ */
  const chartData = [
    { name: "Pending", value: pending.length },
    { name: "Progress", value: progress.length },
    { name: "Completed", value: completed.length },
    { name: "Overdue", value: overdue.length },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

  const weekData = [
    { name: "Pending", tasks: pending.length },
    { name: "Progress", tasks: progress.length },
    { name: "Done", tasks: completed.length },
    { name: "Late", tasks: overdue.length },
  ];

  /* ===========================
     GREETING
  ============================ */
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="admin-wrap">
      {/* Header */}
      <div className="admin-top modern-top">
        <div>
          <h1>{greeting}, Admin 👋</h1>
          <p>Manage developers, deadlines and daily progress.</p>
          <span className="top-date">
            {new Date().toDateString()}
          </span>
        </div>

        <div className="top-mini-info">
          <div>
            <strong>{tasks.length}</strong>
            <small>Total</small>
          </div>

          <div>
            <strong>{completed.length}</strong>
            <small>Done</small>
          </div>

          <div>
            <strong>{overdue.length}</strong>
            <small>Late</small>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="admin-stats">
        <div className="stat-card total">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat-card pending">
          <span>Pending</span>
          <h2>{pending.length}</h2>
        </div>

        <div className="stat-card in-progress">
          <span>In Progress</span>
          <h2>{progress.length}</h2>
        </div>

        <div className="stat-card completed">
          <span>Completed</span>
          <h2>{completed.length}</h2>
        </div>

        <div className="stat-card overdue">
          <span>Overdue</span>
          <h2>{overdue.length}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-box">
          <h3>Task Status</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Overview</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="tasks"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urgent */}
      <div className="table-box">
        <h3>Urgent Deadlines</h3>

        {urgentTasks.length === 0 ? (
          <p>No urgent tasks</p>
        ) : (
          urgentTasks.map((task) => (
            <div key={task._id} className="urgent-row">
              {task.title} • {task.developer?.name || "N/A"}
            </div>
          ))
        )}
      </div>

      {/* Recent */}
      <div className="table-box">
        <h3>Recent Tasks</h3>

        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Developer</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentTasks.length === 0 ? (
              <tr>
                <td colSpan="5">No tasks</td>
              </tr>
            ) : (
              recentTasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.developer?.name || "N/A"}</td>
                  <td>
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${task.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;