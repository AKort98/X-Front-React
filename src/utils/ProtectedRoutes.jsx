import { Outlet, Navigate } from "react-router-dom";
import userAuthStore from "../zustand/authStore";

import React from "react";

const ProtectedRoutes = () => {
  const user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;
