import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  Pending: "#f39c12",
  "In-Progress": "#3498db",
  Completed: "#2ecc71",
  "Late Completed": "#e74c3c",
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===================================
     FETCH TASKS
  =================================== */
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/developers/tasks");

      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ===================================
     UPDATE STATUS
  =================================== */
  const updateStatus = async (taskId, newStatus) => {
    try {
      // console.log("Updating:", taskId, newStatus);

      await axios.patch(`/tasks/${taskId}`, {
        status: newStatus,
      });

      toast.success("Status updated successfully!");

      fetchTasks();
    } catch (err) {
      console.error(
        "Failed to update status",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  /* ===================================
     LOADING
  =================================== */
  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "60px",
          fontSize: "18px",
        }}
      >
        Loading tasks...
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "38px",
          fontWeight: "700",
          color: "#1e293b",
        }}
      >
        My Tasks
      </h1>

      {tasks.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2>No tasks assigned</h2>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                background: "#fff",
                borderRadius: "22px",
                padding: "24px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)",
                transition: "0.3s",
                border: "1px solid #eef2f7",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  color: "#0f172a",
                }}
              >
                {task.title}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                {task.description ||
                  "No description available"}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    background:
                      statusColors[task.status] ||
                      "#64748b",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {task.status}
                </span>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: `2px solid ${
                      statusColors[task.status]
                    }`,
                    outline: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In-Progress">
                    In-Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "15px",
                  borderTop: "1px solid #e2e8f0",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                Deadline:{" "}
                {new Date(
                  task.deadline
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </div>
  );
};

export default MyTasks;