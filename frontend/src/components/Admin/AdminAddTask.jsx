import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminAddTask.css';

const AdminAddTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    developer: '',
    status: 'Pending',
    deadline: '',
  });
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/developers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevelopers(res.data);
      } catch (err) {
        console.error(err);
        alert('❌ Failed to fetch developers');
      }
    };
    fetchDevelopers();
  }, []);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/tasks', {
        title: task.title,
        description: task.description,
        developerId: task.developer,
        deadline: task.deadline,
        status: task.status,
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert('✅ Task assigned successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to assign task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-task">
      <h2>Assign Task to Developer</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />
        <input type="datetime-local" name="deadline" value={task.deadline} onChange={handleChange} required />
        <select name="developer" value={task.developer} onChange={handleChange} required>
          <option value="">--Select Developer--</option>
          {developers.map(dev => <option key={dev._id} value={dev._id}>{dev.name}</option>)}
        </select>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Assigning...' : 'Assign Task'}</button>
      </form>
    </div>
  );
};

export default AdminAddTask;
