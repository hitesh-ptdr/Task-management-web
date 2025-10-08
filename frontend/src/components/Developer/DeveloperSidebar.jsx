import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DeveloperSidebar = () => {
  const navigate = useNavigate();
  const [devName, setDevName] = useState("");

  useEffect(() => {
    const storedDev = JSON.parse(localStorage.getItem("developer"));
    if (storedDev && storedDev.name) {
      setDevName(storedDev.name);
    } else {
      setDevName("Developer");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("devToken");
    localStorage.removeItem("isDevLoggedIn");
    localStorage.removeItem("developer");
    navigate("/developer/login");
  };

  return (
    <nav
      style={{
        width: "240px",
        backgroundColor: "#2c3e50",
        color: "white",
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
        height: "calc(100vh - 60px)", // 👈 navbar ki height minus
        position: "fixed",
        top: "60px", // 👈 navbar ke niche start karega
        left: 0,
        boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
        zIndex: 999,
      }}
    >
      {/* Developer Info */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#1abc9c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px auto",
            fontSize: "24px",
            fontWeight: "700",
            color: "white",
          }}
        >
          {devName.charAt(0).toUpperCase()}
        </div>
        <h3 style={{ fontSize: "18px", margin: "5px 0" }}>{devName}</h3>
        <p style={{ fontSize: "14px", color: "#bdc3c7", margin: 0 }}>
          Developer
        </p>
      </div>

      {/* Navigation Links */}
      <NavLink
        to="/developer/dashboard"
        end
        style={({ isActive }) => ({
          padding: "15px 20px",
          textDecoration: "none",
          color: "white",
          fontWeight: isActive ? "700" : "500",
          fontSize: "16px",
          backgroundColor: isActive ? "#1abc9c" : "transparent",
          transition: "0.3s",
        })}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/developer/dashboard/my-tasks"
        style={({ isActive }) => ({
          padding: "15px 20px",
          textDecoration: "none",
          color: "white",
          fontWeight: isActive ? "700" : "500",
          fontSize: "16px",
          backgroundColor: isActive ? "#1abc9c" : "transparent",
          transition: "0.3s",
        })}
      >
        My Tasks
      </NavLink>

      <NavLink
        to="/developer/dashboard/profile"
        style={({ isActive }) => ({
          padding: "15px 20px",
          textDecoration: "none",
          color: "white",
          fontWeight: isActive ? "700" : "500",
          fontSize: "16px",
          backgroundColor: isActive ? "#1abc9c" : "transparent",
          transition: "0.3s",
        })}
      >
        Profile
      </NavLink>

      <NavLink
        to="/developer/dashboard/settings"
        style={({ isActive }) => ({
          padding: "15px 20px",
          textDecoration: "none",
          color: "white",
          fontWeight: isActive ? "700" : "500",
          fontSize: "16px",
          backgroundColor: isActive ? "#1abc9c" : "transparent",
          transition: "0.3s",
        })}
      >
        Settings
      </NavLink>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          backgroundColor: "#e74c3c",
          border: "none",
          padding: "15px 20px",
          color: "white",
          fontWeight: "700",
          fontSize: "16px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default DeveloperSidebar;
