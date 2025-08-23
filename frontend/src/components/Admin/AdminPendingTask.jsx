import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminPendingTask = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
      setPendingTasks(res.data.filter(task => task.status === 'Pending'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>Pending Tasks</h2>
      <ul>
        {pendingTasks.map((task, i) => (
          <li key={i}>{task.title} - {task.developer?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPendingTask;
