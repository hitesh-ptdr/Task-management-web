import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminAllDevelopers = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/developers', {  // ✅ corrected endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevelopers(res.data);
      } catch (err) {
        console.error('Error fetching developers:', err.response?.data || err);
        alert('❌ Failed to fetch developers');
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <div className="container" style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ marginBottom: '1rem' }}>All Developers</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>S.No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev, idx) => (
            <tr key={dev._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{idx + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllDevelopers;
