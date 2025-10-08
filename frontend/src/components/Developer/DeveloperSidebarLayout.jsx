import React from "react";
import { Outlet } from "react-router-dom";
import DeveloperSidebar from "./DeveloperSidebar";

const DeveloperSidebarLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <DeveloperSidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: "240px", // 👈 Sidebar ke liye jagah chhod do
          marginTop: "60px",   // 👈 Navbar ke liye jagah chhod do
          padding: "20px",
          backgroundColor: "#f9f9f9",
          minHeight: "calc(100vh - 60px)", // navbar height ke baad pura fill
          boxSizing: "border-box",
        }}
      >
        <Outlet /> {/* Nested route components render honge yahan */}
      </main>
    </div>
  );
};

export default DeveloperSidebarLayout;
