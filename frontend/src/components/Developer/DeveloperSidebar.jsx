import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  backgroundColor: "#2c3e50",
  color: "white",
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  height: "100vh",
  boxSizing: "border-box",
};

const linkStyle = {
  padding: "15px 20px",
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  fontSize: "16px",
};

const activeLinkStyle = {
  backgroundColor: "#1abc9c",
  color: "#fff",
  fontWeight: "700",
};

const DeveloperSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("devToken");
    localStorage.removeItem("isDevLoggedIn");
    navigate("/developer/login");
  };

  return (
    <nav style={sidebarStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px" }}>
        Developer Panel
      </h2>
      <NavLink
        to="/developer/dashboard"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/developer/dashboard/my-tasks"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        My Tasks
      </NavLink>
      <NavLink
        to="/developer/dashboard/profile"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Profile
      </NavLink>
      <NavLink
        to="/developer/dashboard/settings"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
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
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default DeveloperSidebar;
