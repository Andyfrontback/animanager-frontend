"use client";

import { useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Importa tus nuevos componentes y hooks
import { AnimeStatsCards } from "@/features/dashboard/components/SectionCard";
import { InteractiveStatsChart } from "@/features/dashboard/components/BarChartInteractive";
import { useAnimeStats } from "@/features/dashboard/hooks/useAnimeStats.ts";

// Importa el DataTable
import { columns } from "@/features/anime/components/WatchedDataTable/columns";
import { DataTable } from "@/features/anime/components/WatchedDataTable/data-table";

// Importamos la store
import { useWatchedStore } from "@/stores";

// Helper para sacar el item más frecuente de un Record<string, number>
const getTopItem = (frequencyMap: Record<string, number> = {}): string => {
  const entries = Object.entries(frequencyMap);
  if (entries.length === 0) return "N/A";
  return entries.reduce((max, current) =>
    current[1] > max[1] ? current : max,
  )[0];
};

export function DashboardPage() {
  // Accesibilidad y Meta Tags
  useEffect(() => {
    document.title = "Dashboard";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Métricas avanzadas y estadísticas de tu Watched List de anime.",
      );
    }
  }, []);

  // recuperamos la store
  const watchedList = useWatchedStore((state) => state.watchedList);

  // Orquestación de datos (Web Worker)
  const { stats, isLoading, error } = useAnimeStats("sync");

  // Derivamos los datos tope memoizados para no recalcular en cada render
  const topItems = useMemo(() => {
    if (!stats) return { topGenre: "N/A", favoriteStudio: "N/A" };
    return {
      topGenre: getTopItem(stats.genreFrequency),
      favoriteStudio: getTopItem(stats.studioFrequency),
    };
  }, [stats]);

  return (
    <main className="flex flex-1 flex-col" aria-label="Dashboard Principal">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Manejo de estados (Error / Loading / Success) */}
          {error ? (
            <div className="px-4 text-red-500">
              Error loading statistics: {error.message}
            </div>
          ) : isLoading || !stats ? (
            // Skeletons de carga
            <div className="px-4 lg:px-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-30 w-full rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-100 w-full rounded-xl" />
            </div>
          ) : (
            // Renderizado Exitoso
            <>
              <section aria-label="Tarjetas de Métricas">
                <AnimeStatsCards
                  totalMinutes={stats.totalMinutes}
                  avgScore={stats.averageScore}
                  topGenre={topItems.topGenre}
                  favoriteStudio={topItems.favoriteStudio}
                />
              </section>

              <section
                className="px-4 lg:px-6"
                aria-label="Gráfico de Estadísticas"
              >
                <InteractiveStatsChart
                  genreFrequency={stats.genreFrequency}
                  studioFrequency={stats.studioFrequency}
                />
              </section>
            </>
          )}

          {/* Aquí irá el data table */}
          <section className="px-4 lg:px-6" aria-label="Tabla de animes vistos">
            <DataTable
              columns={columns}
              data={watchedList}
              maxSheetSize={false}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
