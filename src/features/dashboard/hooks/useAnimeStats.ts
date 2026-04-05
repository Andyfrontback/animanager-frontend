// useAnimeStats.ts
import { useState, useEffect } from "react";
import type { AnimeStats } from "@/features/dashboard/services/statsEngine.service";
import {
  syncStatsCalculator,
  workerStatsCalculator,
} from "@/features/dashboard/services/statsAdapter.service";
import { useWatchedStore } from "@/stores/watched.store";
type CalculationStrategy = "worker" | "sync";

interface UseAnimeStatsReturn {
  stats: AnimeStats | null;
  isLoading: boolean;
  error: Error | null;
}

export const useAnimeStats = (
  strategy: CalculationStrategy = "worker",
): UseAnimeStatsReturn => {
  // Obtenemos la lista directamente del store global
  const watchedList = useWatchedStore((state) => state.watchedList);

  const [stats, setStats] = useState<AnimeStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const calculate = async () => {
      try {
        // Seleccionamos el adaptador (Inversión de dependencias)
        const calculator =
          strategy === "worker" ? workerStatsCalculator : syncStatsCalculator;

        const result = await calculator.calculate(watchedList);

        if (isMounted) {
          setStats(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Error calculating stats"),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    calculate();

    // Cleanup para evitar fugas de memoria si el componente se desmonta
    // antes de que el worker o la promesa terminen.
    return () => {
      isMounted = false;
    };
  }, [watchedList, strategy]); // Se re-ejecuta si cambia la lista o la estrategia elegida

  return { stats, isLoading, error };
};
