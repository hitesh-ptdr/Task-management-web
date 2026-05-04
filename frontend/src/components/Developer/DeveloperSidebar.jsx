import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "../Styles/DeveloperSidebar.css";

const DeveloperSidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [developer, setDeveloper] = useState({
    name: "Developer",
    profilePic: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("devToken");

    if (!token) {
      navigate("/developer/login");
      return;
    }

    axios
      .get("/developers/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDeveloper(res.data.developer))
      .catch(() => {
        localStorage.clear();
        navigate("/developer/login");
      });
  }, [navigate]);

  const closeMenu = () => setOpen(false);

  const logout = () => {
    localStorage.clear();
    navigate("/developer/login");
  };

  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && <div className="overlay" onClick={closeMenu}></div>}

      <aside className={open ? "sidebar open" : "sidebar"}>
        <button className="close-btn" onClick={closeMenu}>
          ✕
        </button>

        {/* Profile */}
        <div className="sidebar-top">
          {developer.profilePic ? (
            <img
              src={`http://localhost:4000/uploads/${developer.profilePic}`}
              alt="profile"
              className="sidebar-img"
            />
          ) : (
            <div className="sidebar-avatar">
              {developer.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <h3>{developer.name}</h3>
          <p>Developer Panel</p>
        </div>

        {/* Links */}
        <div className="sidebar-links">

          {/* HOME ADD */}
          <NavLink to="/" onClick={closeMenu}>
            🏠 Home
          </NavLink>

          <NavLink to="/developer/dashboard" end onClick={closeMenu}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/developer/dashboard/my-tasks" onClick={closeMenu}>
            📋 My Tasks
          </NavLink>

          <NavLink to="/developer/dashboard/profile" onClick={closeMenu}>
            👤 Profile
          </NavLink>

          <NavLink to="/developer/dashboard/settings" onClick={closeMenu}>
            ⚙️ Settings
          </NavLink>
        </div>

        {/* Logout */}
        <button className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>
    </>
  );
};

export default DeveloperSidebar;