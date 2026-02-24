import { api } from "@/lib/axios";
import type { Anime, JikanResponse } from "@/models";
import type { SearchPanelInput } from "../schemas/anime.schema";

interface SearchAnimesServiceInput extends SearchPanelInput {
  signal: AbortSignal;
}

const searchAnimesService = async ({
  start_date,
  page,
  limit,
  order_by,
  sort,
  end_date,
  q,
  signal,
}: SearchAnimesServiceInput): Promise<JikanResponse<Anime[]>> => {
  const response = await api.get<Anime[]>(
    `/anime?order_by=${order_by}&sort=${sort}&start_date=${start_date}&page=${page}&limit=${limit}${end_date ? `&end_date=${end_date}` : ""}${q ? `&q=${q}` : ""}&genres_exclude=12`,
    { signal },
  );

  const animes = response.data;

  // Limpiamos los duplicados para que el cache de Tanstack Query funcione correctamente (La api pública lamentablemente arroja animes duplicados en ocasiones)
  const seenIds = new Set<number>();

  const uniqueAnimes = animes.filter((anime: Anime) => {
    if (seenIds.has(anime.mal_id)) {
      return false;
    }
    seenIds.add(anime.mal_id);
    return true;
  });

  return {
    ...response,
    data: uniqueAnimes,
  };
};

export { searchAnimesService };
