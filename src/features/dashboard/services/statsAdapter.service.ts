// stats-adapters.ts, perdón por no respetar la arquitectura en cuanto a la estructura, pero la verdad es que no amerita hacer esa bobada por una implementación rápida
import type { Anime } from "@/models/anime.model";
import { type AnimeStats, calculateAnimeStats } from "./statsEngine.service";
// Importamos el worker usando la convención de Vite (?worker)
import StatsWorker from "./statsWorker.service?worker";

// Puerto (Contrato)
export interface IStatsCalculator {
  calculate(animeList: Anime[]): Promise<AnimeStats>;
}

// Adaptador 1: Síncrono (Ejecución en el Main Thread)
export const syncStatsCalculator: IStatsCalculator = {
  calculate: async (animeList: Anime[]): Promise<AnimeStats> => {
    // Lo envolvemos en una promesa para cumplir con el contrato,
    // aunque la ejecución real bloquee ligeramente el hilo principal.
    return calculateAnimeStats(animeList);
  },
};

// Adaptador 2: Asíncrono (Ejecución en Web Worker)
export const workerStatsCalculator: IStatsCalculator = {
  calculate: (animeList: Anime[]): Promise<AnimeStats> => {
    return new Promise((resolve, reject) => {
      // Sintaxis nativa de Vite para instanciar el Worker
      const worker = new StatsWorker();

      worker.onmessage = (
        event: MessageEvent<AnimeStats | { error: string }>,
      ) => {
        if ("error" in event.data) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data);
        }
        // Limpiamos el worker para liberar memoria una vez termina su trabajo
        worker.terminate();
      };

      worker.onerror = (error) => {
        reject(error);
        worker.terminate();
      };

      // Iniciamos el cálculo enviando la lista
      worker.postMessage(animeList);
    });
  },
};
