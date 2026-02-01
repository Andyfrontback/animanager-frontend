import { Navigate, Route } from "react-router";
import AnimeRoutes from "./private/AnimeRoutes";
import RoutesWithNotFound from "./components/RoutesWithNotFound";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="anime" />} />
      <Route path="/anime/*" element={<AnimeRoutes />} />;
    </RoutesWithNotFound>
  );
};
