import { Navigate, Route } from "react-router";
import RoutesWithNotFound from "../components/RoutesWithNotFound";
import { AnimeListPage } from "@/pages/AnimeListPage";

const AnimeRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="list" />} />
      <Route path="/list" element={<AnimeListPage />} />
    </RoutesWithNotFound>
  );
};

export default AnimeRoutes;
