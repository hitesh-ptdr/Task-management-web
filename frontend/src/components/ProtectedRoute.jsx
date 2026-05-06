import React from "react";

import {
  Navigate,
} from "react-router-dom";

const ProtectedRoute = ({
  children,
  role,
}) => {

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );

  const devToken =
    localStorage.getItem(
      "devToken"
    );

  // ADMIN
  if (role === "admin") {

    return adminToken
      ? children
      : (
        <Navigate
          to="/admin/login"
          replace
        />
      );
  }

  // DEVELOPER
  if (
    role === "developer"
  ) {

    return devToken
      ? children
      : (
        <Navigate
          to="/developer/login"
          replace
        />
      );
  }

  return children;
};

export default ProtectedRoute;