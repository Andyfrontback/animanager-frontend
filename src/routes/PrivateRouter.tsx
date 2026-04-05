import { Navigate, Route } from "react-router";
import AnimeRoutes from "./private/AnimeRoutes";
import RoutesWithNotFound from "./components/RoutesWithNotFound";
import { DashboardPage } from "@/pages/DashboardPage";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="anime" />} />
      <Route path="/anime/*" element={<AnimeRoutes />} />;
      <Route path="/dashboard" element={<DashboardPage />} />
    </RoutesWithNotFound>
  );
};
