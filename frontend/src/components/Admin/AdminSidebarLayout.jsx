import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminSidebarLayout = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "#f0f2f5" }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#fff",
          height: "100vh",
          overflowY: "auto",
          marginTop: "70px",  
          marginLeft: "220px", 
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebarLayout;
