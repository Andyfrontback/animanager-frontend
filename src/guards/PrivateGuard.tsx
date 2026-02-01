import { Navigate, Outlet } from "react-router";

export const PrivateGuard = () => {
  const isLogged = true; // Lógica de login
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};
