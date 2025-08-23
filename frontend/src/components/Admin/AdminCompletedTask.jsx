import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminCompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
      setCompletedTasks(res.data.filter(task => task.status === 'Completed'));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, i) => (
          <li key={i}>{task.title} - {task.developer?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCompletedTask;
