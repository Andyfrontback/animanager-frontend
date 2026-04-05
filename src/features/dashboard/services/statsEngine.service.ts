// stats-engine.ts
import type { Anime } from "@/models/anime.model";

export interface AnimeStats {
  totalMinutes: number;
  genreFrequency: Record<string, number>;
  studioFrequency: Record<string, number>;
  averageScore: number;
}

/**
 * Convierte strings de Jikan como "24 min per ep", "1 hr 39 min" o "47 min" a minutos totales.
 */
export const parseDurationToMinutes = (
  durationStr: string,
  episodes: number | null,
): number => {
  if (!durationStr || durationStr === "Unknown") return 0;

  let minutes = 0;

  // Extraer horas (ej: "1 hr", "2 hrs")
  const hoursMatch = durationStr.match(/(\d+)\s*(hr|hour|h)/i);
  if (hoursMatch) {
    minutes += parseInt(hoursMatch[1], 10) * 60;
  }

  // Extraer minutos (ej: "39 min", "24 min")
  const minutesMatch = durationStr.match(/(\d+)\s*(min|m)/i);
  if (minutesMatch) {
    minutes += parseInt(minutesMatch[1], 10);
  }

  // Multiplicar si es formato serializado ("per ep")
  if (durationStr.toLowerCase().includes("per ep")) {
    // Si la serie está en emisión, episodes puede ser null. Asumimos al menos 1 episodio visto.
    const epCount = episodes && episodes > 0 ? episodes : 1;
    minutes = minutes * epCount;
  }

  return minutes;
};

/**
 * One-Pass Reducer: O(n)
 * Procesa toda la lista en un solo bucle para extraer todas las métricas.
 */
export const calculateAnimeStats = (animeList: Anime[]): AnimeStats => {
  if (!animeList || animeList.length === 0) {
    return {
      totalMinutes: 0,
      genreFrequency: {},
      studioFrequency: {},
      averageScore: 0,
    };
  }

  // Estado acumulador inicial extendido para calcular promedios
  const initialState = {
    totalMinutes: 0,
    genreFrequency: {} as Record<string, number>,
    studioFrequency: {} as Record<string, number>,
    totalScore: 0,
    scoredCount: 0, // Necesario para no afectar el promedio con animes sin score (score: 0 o null)
  };

  const rawStats = animeList.reduce((acc, anime) => {
    // 1. Calcular Minutos Totales
    acc.totalMinutes += parseDurationToMinutes(anime.duration, anime.episodes);

    // 2. Frecuencia de Géneros
    if (anime.genres) {
      for (const genre of anime.genres) {
        acc.genreFrequency[genre.name] =
          (acc.genreFrequency[genre.name] || 0) + 1;
      }
    }

    // 3. Frecuencia de Estudios
    if (anime.studios) {
      for (const studio of anime.studios) {
        acc.studioFrequency[studio.name] =
          (acc.studioFrequency[studio.name] || 0) + 1;
      }
    }

    // 4. Sumatoria de Scores
    if (anime.score && anime.score > 0) {
      acc.totalScore += anime.score;
      acc.scoredCount += 1;
    }

    return acc;
  }, initialState);

  // Calcular el promedio final y redondear a 2 decimales
  const averageScore =
    rawStats.scoredCount > 0
      ? Number((rawStats.totalScore / rawStats.scoredCount).toFixed(2))
      : 0;

  return {
    totalMinutes: rawStats.totalMinutes,
    genreFrequency: rawStats.genreFrequency,
    studioFrequency: rawStats.studioFrequency,
    averageScore,
  };
};
