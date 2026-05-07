import React from "react";

import {
  Navigate,
} from "react-router-dom";

const DeveloperProtectedRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "devToken"
    );

  return token
    ? children
    : (
      <Navigate
        to="/developer/login"
        replace
      />
    );
};

export default DeveloperProtectedRoute;