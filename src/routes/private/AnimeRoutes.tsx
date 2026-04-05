import { Navigate, Route } from "react-router";
import RoutesWithNotFound from "../components/RoutesWithNotFound";
import { AnimeListPage } from "@/pages/AnimeListPage";
import { TierlistPage } from "@/pages/TierlistPage";

const AnimeRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="list" />} />
      <Route path="/list" element={<AnimeListPage />} />
      <Route path="/tierlist" element={<TierlistPage />} />
    </RoutesWithNotFound>
  );
};

export default AnimeRoutes;
