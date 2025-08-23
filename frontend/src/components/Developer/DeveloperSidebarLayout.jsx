import React from "react";
import { Outlet } from "react-router-dom";
import DeveloperSidebar from "./DeveloperSidebar";

const DeveloperSidebarLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <DeveloperSidebar />
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
        <Outlet /> {/* Nested route components render here */}
      </main>
    </div>
  );
};

export default DeveloperSidebarLayout;
