// stats.worker.ts
import type { Anime } from "@/models/anime.model";
import { calculateAnimeStats } from "@/features/dashboard/services/statsEngine.service";

self.onmessage = (event: MessageEvent<Anime[]>) => {
  try {
    const animeList = event.data;
    const stats = calculateAnimeStats(animeList);
    self.postMessage(stats);
  } catch (error) {
    // Si algo falla, enviamos el error de vuelta
    self.postMessage({ error: (error as Error).message });
  }
};
