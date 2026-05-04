import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import '../../components/Styles/AdminCompletedTask.css';

const AdminCompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', {   
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompletedTasks(res.data.filter(task => task.status === 'Completed'));
    } catch (err) {
      console.error("Error fetching completed tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="admin-tasks-container completed">
      <h2 className="admin-tasks-heading">✅ Completed Tasks</h2>
      <ul className="admin-tasks-list">
        {completedTasks.map((task, i) => (
          <li className="task-card" key={i}>
            <div className="task-title">{task.title}</div>
            <span className="task-badge task-badge-completed">Completed</span>
            <div className="task-footer">
              <span className="assigned-to">{task.developer?.name || "N/A"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCompletedTask;
