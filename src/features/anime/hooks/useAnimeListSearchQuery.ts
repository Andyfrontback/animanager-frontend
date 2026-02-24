import { useQuery } from "@tanstack/react-query";
import { searchAnimesService } from "../services/anime.service";
import type { SearchPanelInput } from "../schemas/anime.schema";

export const useAnimeListSearchQuery = (queryParams: SearchPanelInput) => {
  return useQuery({
    queryKey: ["anime-list", queryParams],
    queryFn: async ({ signal }) => {
      return await searchAnimesService({ ...queryParams, signal });
    },
    staleTime: Infinity, // Los animes no cambian de repente, por lo tanto solo se deben actualizar cuando el caché esta vacío o se fuerza una recarga
  });
};
