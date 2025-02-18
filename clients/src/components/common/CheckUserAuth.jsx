import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckUserAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role == "admin") {
      return <Navigate to="/auth/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth" />;
  }

  if (
    isAuthenticated &&
    user?.role == "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
}

export default CheckUserAuth;
