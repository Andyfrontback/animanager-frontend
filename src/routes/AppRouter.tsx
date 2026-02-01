import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import AnimeRoutes from "./AnimeRoutes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/anime/*" element={<AnimeRoutes />} />

        {/* Redirección opcional: si entran a la raíz, mandarlos a la lista */}
        <Route path="/" element={<Navigate to="/anime/anime-list" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
