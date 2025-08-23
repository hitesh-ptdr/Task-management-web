import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const DeveloperProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("devToken");
    const isDevLogged = localStorage.getItem("isDevLoggedIn") === "true";
    setIsAuthenticated(token && isDevLogged);
  }, []);

  if (isAuthenticated === null) return null; // waiting for auth check
  return isAuthenticated ? children : <Navigate to="/developer/login" />;
};

export default DeveloperProtectedRoute;
