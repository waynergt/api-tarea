import { Navigate } from "react-router-dom";

export default function RedirectToLogin() {
  const token = localStorage.getItem("token");
  // Si hay token, ve a expedientes; si no, ve a login
  return token ? <Navigate to="/expedientes" replace /> : <Navigate to="/login" replace />;
}