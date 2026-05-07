import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "../../api/axios";

import "../Styles/DeveloperDashboard.css";

const DeveloperDashboard = () => {

  const [tasks, setTasks] =
    useState([]);

  const navigate =
    useNavigate();

  /* ===========================
     FETCH TASKS
  =========================== */
  const fetchTasks =
    async (token) => {

      try {

        const res =
          await axios.get(
            "/developers/tasks",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTasks(
          res.data
        );

      } catch (err) {

        console.error(
          "Error fetching tasks:",
          err
        );
      }
    };

  /* ===========================
     AUTH CHECK
  =========================== */
  useEffect(() => {

    const devToken =
      localStorage.getItem(
        "devToken"
      );

    // NO TOKEN
    if (!devToken) {

      navigate(
        "/developer/login",
        {
          replace: true,
        }
      );

      return;
    }

    // FETCH TASKS
    fetchTasks(devToken);

  }, []);

  /* ===========================
     FILTERS
  =========================== */

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

  /* ===========================
     GREETING
  =========================== */

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="dev-wrap">

      {/* HEADER */}
      <div className="welcome-card">

        <h1>
          {greeting},
          Developer 👋
        </h1>

        <p>
          Manage your assigned
          work & deadlines.
        </p>

      </div>

      {/* STATS */}
      <div className="stats-row">

        <div className="mini-card total">
          <span>
            Total Tasks
          </span>
          <h3>
            {tasks.length}
          </h3>
        </div>

        <div className="mini-card pending">
          <span>
            Pending
          </span>
          <h3>
            {pending.length}
          </h3>
        </div>

        <div className="mini-card in-progress">
          <span>
            In Progress
          </span>
          <h3>
            {progress.length}
          </h3>
        </div>

        <div className="mini-card completed">
          <span>
            Completed
          </span>
          <h3>
            {
              completed.length
            }
          </h3>
        </div>

        <div className="mini-card overdue">
          <span>
            Overdue
          </span>
          <h3>
            {overdue.length}
          </h3>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-box">

        <h2>
          My Recent Tasks
        </h2>

        <table className="task-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Task</th>

              <th>Created</th>

              <th>Deadline</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {tasks.length === 0 ? (

              <tr>

                <td colSpan="5">
                  No tasks assigned
                </td>

              </tr>

            ) : (

              tasks.map(
                (
                  task,
                  index
                ) => (

                  <tr
                    key={
                      task._id
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {task.title}
                    </td>

                    <td>

                      {new Date(
                        task.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      {new Date(
                        task.deadline
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      <span
                        className={`badge ${task.status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                      >

                        {task.status}

                      </span>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DeveloperDashboard;