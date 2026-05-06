// AdminSidebar.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
} from "react-router-dom";

import axios from "../../api/axios";

import "../Styles/AdminSidebar.css";

import {
  FaHome,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaTasks,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {

  const [admin, setAdmin] =
    useState({
      name: "Admin",
      profilePic: "",
    });

  const [open, setOpen] =
    useState(false);

  // ✅ UPDATED TOKEN
  const token =
    localStorage.getItem(
      "adminToken"
    );

  /* FETCH ADMIN */
  const fetchAdmin =
    async () => {

      try {

        const res =
          await axios.get(
            "/admin/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAdmin(
          res.data.admin
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  useEffect(() => {

    if (token) {
      fetchAdmin();
    }

  }, []);

  const closeMenu = () =>
    setOpen(false);

  return (
    <>

      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-btn"
        onClick={() =>
          setOpen(true)
        }
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="overlay"
          onClick={
            closeMenu
          }
        ></div>
      )}

      {/* SIDEBAR */}
      <nav
        className={
          open
            ? "sidebar open"
            : "sidebar"
        }
      >

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={
            closeMenu
          }
        >
          ✕
        </button>

        {/* PROFILE */}
        <div className="sidebar-top">

          {admin.profilePic ? (

            <img
              src={`http://localhost:4000/uploads/${admin.profilePic}`}
              alt="admin"
              className="sidebar-img"
            />

          ) : (

            <div className="sidebar-avatar">

              {admin.name
                ?.charAt(0)
                .toUpperCase()}

            </div>
          )}

          <h3>
            {admin.name}
          </h3>

          <p>
            Administrator
          </p>

        </div>

        {/* LINKS */}
        <div className="sidebar-links">

          <NavLink
            to="/"
            onClick={
              closeMenu
            }
          >
            <FaHome />
            Home
          </NavLink>

          <NavLink
            to="/admin/dashboard"
            end
            onClick={
              closeMenu
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-developer"
            onClick={
              closeMenu
            }
          >
            <FaUserPlus />
            Add Developer
          </NavLink>

          <NavLink
            to="/admin/all-developer"
            onClick={
              closeMenu
            }
          >
            <FaUsers />
            All Developers
          </NavLink>

          <NavLink
            to="/admin/add-task"
            onClick={
              closeMenu
            }
          >
            <FaTasks />
            Add Task
          </NavLink>

          <NavLink
            to="/admin/all-task"
            onClick={
              closeMenu
            }
          >
            <FaClipboardList />
            All Tasks
          </NavLink>

          <NavLink
            to="/admin/completed-task"
            onClick={
              closeMenu
            }
          >
            <FaCheckCircle />
            Completed
          </NavLink>

          <NavLink
            to="/admin/pending-task"
            onClick={
              closeMenu
            }
          >
            <FaClock />
            Pending
          </NavLink>

          <NavLink
            to="/admin/progress-task"
            onClick={
              closeMenu
            }
          >
            <FaSpinner />
            Progress
          </NavLink>

          <NavLink
            to="/admin/profile"
            onClick={
              closeMenu
            }
          >
            <FaUserCircle />
            Profile
          </NavLink>

          <NavLink
            to="/admin/logout"
            onClick={
              closeMenu
            }
          >
            <FaSignOutAlt />
            Logout
          </NavLink>

        </div>

      </nav>

    </>
  );
};

export default AdminSidebar;