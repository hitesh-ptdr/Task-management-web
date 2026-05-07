// src/layouts/AdminRegisterLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminRegisterLayout = () => {
  const handleClose = () => {
    console.log('Register layout closed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Register</h1>
        <Outlet context={{ handleClose }} />
      </div>
    </div>
  );
};

export default AdminRegisterLayout;
