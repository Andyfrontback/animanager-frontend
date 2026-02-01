import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router";

interface RoutesProps {
  children: ReactNode;
}

const RoutesWithNotFound = ({ children }: RoutesProps) => {
  return (
    <Routes>
      {/* 1. Renderizamos las rutas hijas primero */}
      {children}

      {/* 2. Definimos la ruta de destino */}
      <Route path="/404" element={<p>404 Not Found</p>} />

      {/* 3. El comodín (*) al final para atrapar todo lo demás */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RoutesWithNotFound;
