import type { Anime } from "@/models";

export const clearRepeatedAnimes = (animes: Anime[]) => {
  const seenIds = new Set<number>();

  const uniqueAnimes = animes.filter((anime: Anime) => {
    if (seenIds.has(anime.mal_id)) {
      return false;
    }
    seenIds.add(anime.mal_id);
    return true;
  });

  return uniqueAnimes;
};
