import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

const AdminLoginLayout = () => {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  // ALREADY LOGGED IN
  if (token) {

    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-r
        from-green-400
        to-teal-500
        p-4
      "
    >

      <div
        className="
          bg-white
          shadow-2xl
          rounded-2xl
          p-8
          w-full
          max-w-md
        "
      >

        <Outlet />

      </div>

    </div>
  );
};

export default AdminLoginLayout;