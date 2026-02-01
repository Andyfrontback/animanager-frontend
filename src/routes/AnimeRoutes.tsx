import { Route } from "react-router";
import RoutesWithNotFound from "./components/RoutesWithNotFound";
import { AnimeList } from "@/features/anime/components/AnimeList";

const AnimeRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/anime-list" element={<AnimeList />} />
    </RoutesWithNotFound>
  );
};

export default AnimeRoutes;
