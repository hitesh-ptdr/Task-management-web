
  
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminSidebarLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebarLayout;
