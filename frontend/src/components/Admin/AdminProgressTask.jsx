import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import '../../components/Styles/AdminProgressTask.css'; 

const ProgressPanel = () => {
  const [progressTasks, setProgressTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgressTasks(res.data.filter(task => task.status === 'In-Progress'));
    } catch (err) {
      console.error("Error fetching progress tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="progress-panel-container">
      <h2 className="progress-panel-heading">🚧 In-Progress Tasks</h2>
      <ul className="progress-panel-list">
        {progressTasks.length === 0 ? (
          <li className="progress-card">
            <div className="progress-title">No tasks found</div>
          </li>
        ) : (
          progressTasks.map((task, i) => (
            <li className="progress-card" key={i}>
              <div className="progress-title">{task.title}</div>
              <span className="progress-badge">In-Progress</span>
              <div className="progress-footer">
                <span className="progress-assigned">{task.developer?.name || "N/A"}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProgressPanel;
