import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  // अगर token नहीं है तो login पर redirect करो
  if (!token) {
    return <Navigate to={role === "admin" ? "/admin" : "/developer"} replace />;
  }

  // Admin check
  if (role === "admin") {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdmin) return <Navigate to="/admin" replace />;
  }

  // Developer check
  if (role === "developer") {
    const isDev = localStorage.getItem("isDevLoggedIn") === "true";
    if (!isDev) return <Navigate to="/developer" replace />;
  }

  return children;
};

export default ProtectedRoute;
