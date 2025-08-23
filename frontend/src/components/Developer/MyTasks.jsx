import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const statusColors = {
  Pending: "#f39c12",      // orange
  "In-Progress": "#3498db", // blue
  Completed: "#2ecc71",    // green
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/developers/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`/developers/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#7f8c8d",
          marginTop: "60px",
        }}
      >
        Loading tasks...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 16px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "32px",
          color: "#2c3e50",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        My Tasks
      </h1>

      {tasks.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#95a5a6",
            fontSize: "20px",
            marginTop: "40px",
          }}
        >
          No tasks assigned.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                background: `linear-gradient(145deg, #ffffff, #e6ecf0)`,
                borderRadius: "16px",
                padding: "20px 24px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <h2
                  style={{
                    margin: "0 0 8px",
                    color: "#2c3e50",
                    fontSize: "20px",
                  }}
                >
                  {task.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#7f8c8d",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {task.description || "No description provided"}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "12px",
                    backgroundColor: statusColors[task.status],
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {task.status}
                </span>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                  style={{
                    padding: "8px 12px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: `2px solid ${statusColors[task.status]}`,
                    color: statusColors[task.status],
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontWeight: "500",
                    minWidth: "140px",
                  }}
                >
                  {Object.keys(statusColors).map((status) => (
                    <option
                      key={status}
                      value={status}
                      style={{
                        color: statusColors[status],
                        fontWeight: "500",
                      }}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "#95a5a6",
                }}
              >
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
