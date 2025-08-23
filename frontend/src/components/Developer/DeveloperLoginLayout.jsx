import React from "react";
import { Outlet } from "react-router-dom";

const DeveloperLoginLayout = () => {
  return <Outlet />; // Nested routes ke liye ye zaruri hai
};

export default DeveloperLoginLayout;
