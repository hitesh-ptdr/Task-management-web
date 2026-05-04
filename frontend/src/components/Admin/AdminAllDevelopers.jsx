// import React, { useEffect, useState } from 'react';
// import axios from '../../api/axios';

// const AdminAllDevelopers = () => {
//   const [developers, setDevelopers] = useState([]);

//   useEffect(() => {
//     const fetchDevelopers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/developers', {  
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDevelopers(res.data);
//       } catch (err) {
//         console.error('Error fetching developers:', err.response?.data || err);
//         alert('❌ Failed to fetch developers');
//       }
//     };
//     fetchDevelopers();
//   }, []);

//   return (
//     <div className="container" style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif" }}>
//       <h2 style={{ marginBottom: '1rem' }}>All Developers</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ background: '#f1f1f1' }}>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>S.No</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {developers.map((dev, idx) => (
//             <tr key={dev._id}>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{idx + 1}</td>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.name}</td>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminAllDevelopers;


import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminAllDevelopers = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/developers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevelopers(res.data);
    } catch (err) {
      console.error('Error fetching developers:', err.response?.data || err);
      alert('Failed to fetch developers');
    }
  };

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/developers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // UI update without reload
      setDevelopers((prev) => prev.filter((dev) => dev._id !== id));

      alert("Developer deleted successfully");
    } catch (err) {
      console.error('Error deleting developer:', err.response?.data || err);
      alert("Failed to delete developer");
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ marginBottom: '1rem' }}>All Developers</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>S.No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev, idx) => (
            <tr key={dev._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{idx + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dev.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  onClick={() => handleDelete(dev._id)}
                  style={{
                    padding: '6px 10px',
                    background: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllDevelopers;