import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogout.css";
import { CheckCircle } from "lucide-react";

const AdminLogout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Clear session
    localStorage.removeItem("token");
    localStorage.removeItem("isAdminLoggedIn");

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/admin/login"); // Redirect to login
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <CheckCircle className="logout-icon" size={60} />
        <h1>Logged Out Successfully</h1>
        <p>You will be redirected in <span>{countdown}</span> seconds...</p>
      </div>
    </div>
  );
};

export default AdminLogout;
