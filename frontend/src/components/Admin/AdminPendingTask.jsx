import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import '../../components/Styles/AdminPendingTask.css';

const AdminPendingTask = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingTasks(res.data.filter(task => task.status === 'Pending'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="admin-tasks-container pending">
      <h2 className="admin-tasks-heading">⏳ Pending Tasks</h2>
      <ul className="admin-tasks-list">
        {pendingTasks.map((task, i) => (
          <li className="task-card" key={i}>
            <div className="task-title">{task.title}</div>
            <span className="task-badge task-badge-pending">Pending</span>
            <div className="task-footer">
              <span className="assigned-to">{task.developer?.name || "N/A"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPendingTask;
