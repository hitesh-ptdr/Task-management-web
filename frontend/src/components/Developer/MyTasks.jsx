import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  Pending: "#f39c12",
  "In-Progress": "#3498db",
  Completed: "#2ecc71",
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("devToken");
      const res = await axios.get("/developers/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // Update task status
  const updateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("devToken");
      console.log("Updating task:", taskId, "to", newStatus);

      const res = await axios.patch(`/developers/tasks/${taskId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Status updated successfully!");

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Failed to update status", err.response?.data || err.message);
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading tasks...</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Segoe UI", padding: "0 16px", minHeight: "100vh", backgroundColor:"#f8f9fa" }}>
      <h1 style={{ textAlign: "center", marginBottom: "32px" }}>My Tasks</h1>

      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>No tasks assigned.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {tasks.map((task) => (
            <div key={task._id} style={{ background:"#fff", borderRadius:"16px", padding:"20px", boxShadow:"0 6px 20px rgba(0,0,0,0.08)", transition:"0.3s" }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(0,0,0,0.15)"}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.08)"}}
            >
              <h2>{task.title}</h2>
              <p>{task.description || "No description"}</p>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"12px", flexWrap:"wrap" }}>
                <span style={{ padding:"6px 12px", borderRadius:"12px", backgroundColor:statusColors[task.status], color:"#fff" }}>{task.status}</span>

                <select value={task.status} onChange={(e)=>updateStatus(task._id, e.target.value)}
                  style={{ padding:"8px 12px", borderRadius:"8px", border:`2px solid ${statusColors[task.status]}`, color:statusColors[task.status], backgroundColor:"#fff", cursor:"pointer", minWidth:"140px" }}
                >
                  {Object.keys(statusColors).map((status)=>(
                    <option key={status} value={status} style={{ color:statusColors[status] }}>{status}</option>
                  ))}
                </select>
              </div>

              <p style={{ marginTop:"10px", fontSize:"12px", color:"#95a5a6" }}>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default MyTasks;
