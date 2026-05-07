import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

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

  const [tasks, setTasks] =
    useState([]);

  const navigate =
    useNavigate();

  /* ===========================
     FETCH TASKS
  ============================ */
  const fetchTasks =
    async () => {

      try {

        const res =
          await axios.get(
            "/tasks"
          );

        setTasks(
          res.data
        );

      } catch (error) {

        console.log(
          "Fetch task error:",
          error
        );
      }
    };

  /* ===========================
     AUTH + VERIFY
  ============================ */
  useEffect(() => {

    // ✅ FIXED TOKEN
    const token =
      localStorage.getItem(
        "adminToken"
      );

    // NO TOKEN
    if (!token) {

      localStorage.removeItem(
        "adminToken"
      );

      navigate(
        "/admin/login",
        {
          replace: true,
        }
      );

      return;
    }

    /* VERIFY ADMIN */
    const verifyAdmin =
      async () => {

        try {

          const res =
            await axios.get(
              "/admin/verify-admin"
            );

          if (
            res.data?.admin
          ) {

            fetchTasks();

          } else {

            localStorage.removeItem(
              "adminToken"
            );

            navigate(
              "/admin/login",
              {
                replace:
                  true,
              }
            );
          }

        } catch (error) {

          console.log(
            "Verify error:",
            error
          );

          localStorage.removeItem(
            "adminToken"
          );

          navigate(
            "/admin/login",
            {
              replace:
                true,
            }
          );
        }
      };

//       console.log(
//   "ADMIN TOKEN:",
//   localStorage.getItem(
//     "adminToken"
//   )
// );

    verifyAdmin();

    /* AUTO REFRESH */
    const interval =
      setInterval(() => {

        fetchTasks();

      }, 30000);

    return () =>
      clearInterval(
        interval
      );

  }, [navigate]);

  /* ===========================
     FILTERS
  ============================ */

  const pending =
    tasks.filter(
      (t) =>
        t.status
          ?.toLowerCase() ===
        "pending"
    );

  const progress =
    tasks.filter(
      (t) =>
        t.status
          ?.toLowerCase() ===
        "in-progress"
    );

  const completed =
    tasks.filter((t) =>
      t.status
        ?.toLowerCase()
        .includes(
          "completed"
        )
    );

  const overdue =
    tasks.filter(
      (t) =>
        new Date(
          t.deadline
        ) < new Date() &&
        !t.status
          ?.toLowerCase()
          .includes(
            "completed"
          )
    );

  const recentTasks =
    [...tasks]
      .reverse()
      .slice(0, 5);

  /* ===========================
     CHART DATA
  ============================ */

  const chartData = [
    {
      name: "Pending",
      value:
        pending.length,
    },

    {
      name: "Progress",
      value:
        progress.length,
    },

    {
      name: "Completed",
      value:
        completed.length,
    },

    {
      name: "Overdue",
      value:
        overdue.length,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#ef4444",
  ];

  const weekData = [
    {
      name: "Pending",
      tasks:
        pending.length,
    },

    {
      name: "Progress",
      tasks:
        progress.length,
    },

    {
      name: "Done",
      tasks:
        completed.length,
    },

    {
      name: "Late",
      tasks:
        overdue.length,
    },
  ];

  /* ===========================
     GREETING
  ============================ */

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="admin-wrap">

      {/* HEADER */}
      <div className="admin-top modern-top">

        <div>

          <h1>
            {greeting},
            Admin 👋
          </h1>

          <p>
            Manage developers,
            deadlines and
            progress.
          </p>

          <span className="top-date">
            {new Date().toDateString()}
          </span>

        </div>

        <div className="top-mini-info">

          <div>
            <strong>
              {tasks.length}
            </strong>
            <small>Total</small>
          </div>

          <div>
            <strong>
              {
                completed.length
              }
            </strong>
            <small>Done</small>
          </div>

          <div>
            <strong>
              {
                overdue.length
              }
            </strong>
            <small>Late</small>
          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="admin-stats">

        <div className="stat-card total">
          <span>
            Total Tasks
          </span>
          <h2>
            {tasks.length}
          </h2>
        </div>

        <div className="stat-card pending">
          <span>
            Pending
          </span>
          <h2>
            {pending.length}
          </h2>
        </div>

        <div className="stat-card in-progress">
          <span>
            In Progress
          </span>
          <h2>
            {progress.length}
          </h2>
        </div>

        <div className="stat-card completed">
          <span>
            Completed
          </span>
          <h2>
            {
              completed.length
            }
          </h2>
        </div>

        <div className="stat-card overdue">
          <span>
            Overdue
          </span>
          <h2>
            {overdue.length}
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="chart-grid">

        <div className="chart-box">

          <h3>
            Task Status
          </h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={
                  chartData
                }
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >

                {chartData.map(
                  (_, i) => (
                    <Cell
                      key={i}
                      fill={
                        COLORS[i]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-box">

          <h3>
            Overview
          </h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart
              data={
                weekData
              }
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#3b82f6"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* RECENT TASKS */}
      <div className="table-box">

        <h3>
          Recent Tasks
        </h3>

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

            {recentTasks.map(
              (
                task,
                i
              ) => (

                <tr
                  key={
                    task._id
                  }
                >

                  <td>
                    {i + 1}
                  </td>

                  <td>
                    {task.title}
                  </td>

                  <td>
                    {task
                      .developer
                      ?.name ||
                      "N/A"}
                  </td>

                  <td>

                    {new Date(
                      task.deadline
                    ).toLocaleDateString()}

                  </td>

                  <td>
                    {
                      task.status
                    }
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminDashboard;