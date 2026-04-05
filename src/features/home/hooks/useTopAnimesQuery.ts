import { useQuery } from "@tanstack/react-query";
import { searchTopAnimes } from "../services/topAnimes.service";

interface useTopAnimesQueryInput {
  limit: number;
}

export const useTopAnimesQuery = ({ limit }: useTopAnimesQueryInput) => {
  return useQuery({
    queryKey: ["home-top-animes", limit],
    queryFn: async ({ signal }) => {
      return await searchTopAnimes({ limit, signal });
    },
    staleTime: Infinity,
  });
};
