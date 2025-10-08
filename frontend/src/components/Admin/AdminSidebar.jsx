import React from "react";
import { NavLink } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  backgroundColor: "#2c3e50",
  color: "white",
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  position: "fixed",
  top: "70px",
  left: 0,
  height: "calc(100vh - 70px)",
};

const linkStyle = {
  padding: "15px 20px",
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  fontSize: "16px",
  display: "block",
};

const activeLinkStyle = {
  backgroundColor: "#1abc9c",
  color: "#fff",
  fontWeight: "700",
};

const AdminSidebar = () => {
  return (
    <nav style={sidebarStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px" }}>
        Admin Panel
      </h2>

      <NavLink to="/admin/dashboard" style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/add-developer" style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
        Add Developer
      </NavLink>
      <NavLink to="/admin/all-developer" style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
        All Developers
      </NavLink>
      <NavLink to="/admin/add-task" style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
        Add Task
      </NavLink>
      <NavLink to="/admin/all-task" style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>
        All Tasks
      </NavLink> 
       <NavLink to="/admin/completed-task" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}>Completed Tasks</NavLink>
       <NavLink to="/admin/pending-task" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}>Pending Tasks</NavLink>
      <NavLink to="/admin/progress-task" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}>Progress Tasks</NavLink>

      <NavLink to="/admin/logout" style={linkStyle}>
        Logout
      </NavLink>
    </nav>
  );
};

export default AdminSidebar;
