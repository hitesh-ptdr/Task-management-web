import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogout.css";
import { CheckCircle } from "lucide-react";

const AdminLogout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  // 1) Clear session once
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdminLoggedIn");
  }, []);

  // 2) Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3) Redirect when countdown खत्म
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/admin/login", { replace: true });
    }
  }, [countdown, navigate]);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <CheckCircle className="logout-icon" size={60} />
        <h1>Logged Out Successfully</h1>
        <p>
          You will be redirected in <span>{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
};

export default AdminLogout;