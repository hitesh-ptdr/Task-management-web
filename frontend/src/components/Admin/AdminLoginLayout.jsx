import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLoginLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ सिर्फ token check
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLoginLayout;