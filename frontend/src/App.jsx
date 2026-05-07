

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbars/Navbar";

/* HOME */
import Home from "./components/Home/Home";
import About from "./components/About";

/* LAYOUTS */
import AdminSidebarLayout from "./components/Admin/AdminSidebarLayout";

import DeveloperLoginLayout from "./components/Developer/DeveloperLoginLayout";

import DeveloperSidebarLayout from "./components/Developer/DeveloperSidebarLayout";

/* ADMIN */
import AdminLogin from "./components/Admin/AdminLogin";

import AdminRegister from "./components/Admin/AdminRegister";

import AdminDashboard from "./components/Admin/AdminDashboard";

import AdminAddDevelopers from "./components/Admin/AdminAddDevelopers";

import AdminAllDevelopers from "./components/Admin/AdminAllDevelopers";

import AdminAddTask from "./components/Admin/AdminAddTask";

import AdminAllTask from "./components/Admin/AdminAllTask";

import AdminCompletedTask from "./components/Admin/AdminCompletedTask";

import AdminPendingTask from "./components/Admin/AdminPendingTask";

import AdminProgressTask from "./components/Admin/AdminProgressTask";

import AdminProfile from "./components/Admin/AdminProfile";

import AdminLogout from "./components/Admin/AdminLogout";

/* DEVELOPER */
import DeveloperLogin from "./components/Developer/DeveloperLogin";

import DeveloperDashboard from "./components/Developer/DeveloperDashboard";

import MyTasks from "./components/Developer/MyTasks";

import DeveloperProfile from "./components/Developer/DeveloperProfile";

import Settings from "./components/Developer/Settings";

/* PROTECTED */
import ProtectedRoute from "./components/ProtectedRoute";

// import DeveloperProtectedRoute from "./components/Developer/DeveloperProtectedRoute";

/* ===========================
   PUBLIC LAYOUT
=========================== */
const PublicLayout = ({
  children,
}) => (
  <>
    <Navbar />
    {children}
  </>
);

/* ===========================
   APP
=========================== */
const App = () => {

  return (

    <Router>

      <Routes>

        {/* ===========================
            HOME
        =========================== */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        {/* ===========================
            ADMIN AUTH
        =========================== */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />

        {/* ===========================
            ADMIN PANEL
        =========================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminSidebarLayout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* ADD DEV */}
          <Route
            path="add-developer"
            element={<AdminAddDevelopers />}
          />

          {/* ALL DEV */}
          <Route
            path="all-developer"
            element={<AdminAllDevelopers />}
          />

          {/* ADD TASK */}
          <Route
            path="add-task"
            element={<AdminAddTask />}
          />

          {/* ALL TASK */}
          <Route
            path="all-task"
            element={<AdminAllTask />}
          />

          {/* COMPLETED */}
          <Route
            path="completed-task"
            element={<AdminCompletedTask />}
          />

          {/* PENDING */}
          <Route
            path="pending-task"
            element={<AdminPendingTask />}
          />

          {/* PROGRESS */}
          <Route
            path="progress-task"
            element={<AdminProgressTask />}
          />

          {/* PROFILE */}
          <Route
            path="profile"
            element={<AdminProfile />}
          />

          {/* LOGOUT */}
          <Route
            path="logout"
            element={<AdminLogout />}
          />

        </Route>

        {/* ===========================
            DEVELOPER LOGIN
        =========================== */}
        <Route
          path="/developer"
          element={
            <DeveloperLoginLayout />
          }
        >

          <Route
            index
            element={<DeveloperLogin />}
          />

          <Route
            path="login"
            element={<DeveloperLogin />}
          />

          {/* ===========================
              DEVELOPER PANEL
          =========================== */}
   <Route
  path="dashboard"
  element={
    <ProtectedRoute role="developer">
      <DeveloperSidebarLayout />
    </ProtectedRoute>
  }
>

            <Route
              index
              element={<DeveloperDashboard />}
            />

            <Route
              path="my-tasks"
              element={<MyTasks />}
            />

            <Route
              path="profile"
              element={<DeveloperProfile />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>

        </Route>

        {/* ===========================
            404
        =========================== */}
        <Route
          path="*"
          element={
            <h2
              style={{
                padding: "2rem",
              }}
            >
              404 - Page Not Found
            </h2>
          }
        />

      </Routes>

    </Router>
  );
};

export default App;