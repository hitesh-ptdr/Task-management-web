import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminProgressTask = () => {
  const [progressTasks, setProgressTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
      setProgressTasks(res.data.filter(task => task.status === 'In-Progress'));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>In-Progress Tasks</h2>
      <ul>
        {progressTasks.map((task, i) => (
          <li key={i}>{task.title} - {task.developer?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProgressTask;
