import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

  // ✅ Admin token
  const adminToken = localStorage.getItem("token");

  // ✅ Developer token
  const devToken = localStorage.getItem("devToken");

  /* ===========================
     ADMIN PROTECTION
  ============================ */
  if (role === "admin") {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  /* ===========================
     DEVELOPER PROTECTION
  ============================ */
  if (role === "developer") {
    if (!devToken) {
      return <Navigate to="/developer/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;