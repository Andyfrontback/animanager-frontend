import { api } from "@/lib/axios";
import type { Anime, JikanResponse } from "@/models";
import { clearRepeatedAnimes } from "@/utils/clearRepeatedAnimes.util";

interface searchTopAnimesInput {
  limit: number;
  signal: AbortSignal;
}

const searchTopAnimes = async ({
  limit,
  signal,
}: searchTopAnimesInput): Promise<JikanResponse<Anime[]>> => {
  const url = `/top/anime?limit=${limit}&sfw`;

  const response = await api.get<Anime[]>(url, { signal });

  const animes = response.data;

  const uniqueAnimes = clearRepeatedAnimes(animes);

  return {
    ...response,
    data: uniqueAnimes,
  };
};

export { searchTopAnimes };
