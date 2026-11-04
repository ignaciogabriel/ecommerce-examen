// src/components/RoleRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({
  children,
  allowedRoles
}) {

  const {
    user,
    isLoading
  } = useContext(AuthContext);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}