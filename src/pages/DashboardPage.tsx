"use client";

import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";

// Componentes y Hooks
import { AnimeStatsCards } from "@/features/dashboard/components/SectionCard";
import { InteractiveStatsChart } from "@/features/dashboard/components/BarChartInteractive";
import { useAnimeStats } from "@/features/dashboard/hooks/useAnimeStats.ts";
import { columns } from "@/features/anime/components/WatchedDataTable/columns";
import { DataTable } from "@/features/anime/components/WatchedDataTable/data-table";
import { useWatchedStore } from "@/stores";

// Helper
const getTopItem = (frequencyMap: Record<string, number> = {}): string => {
  const entries = Object.entries(frequencyMap);
  if (entries.length === 0) return "N/A";
  return entries.reduce((max, current) =>
    current[1] > max[1] ? current : max,
  )[0];
};

export function DashboardPage() {
  const watchedList = useWatchedStore((state) => state.watchedList);
  const { stats, isLoading, error } = useAnimeStats("sync");

  const topItems = useMemo(() => {
    if (!stats) return { topGenre: "N/A", favoriteStudio: "N/A" };
    return {
      topGenre: getTopItem(stats.genreFrequency),
      favoriteStudio: getTopItem(stats.studioFrequency),
    };
  }, [stats]);

  return (
    <>
      <Helmet>
        <title>User Dashboard | AniManager</title>
        <meta
          name="description"
          content="View detailed statistics, watch time, and analytics of your personal anime list."
        />
        <meta name="robots" content="noindex, nofollow" />{" "}
        {/* Dashboard suele ser privado/personal */}
      </Helmet>

      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6" id="dashboard-main">
        {/* ENCABEZADO DE PÁGINA */}
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              User <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Advanced analytics of your personal anime collection.
            </p>
          </div>
          {/* Aquí podrías poner un botón de "Exportar Reporte" en el futuro */}
        </header>

        {/* Separador visual sutil */}
        <hr className="border-border max-w-7xl mx-auto" aria-hidden="true" />

        <div className="space-y-8">
          {error ? (
            <div
              role="alert"
              className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20"
            >
              <h2 className="font-bold text-lg">Failed to Load Statistics</h2>
              <p>We couldn't process your stats: {error.message}</p>
            </div>
          ) : isLoading || !stats ? (
            <section
              aria-busy="true"
              aria-label="Loading statistics"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-100 w-full rounded-xl" />
            </section>
          ) : (
            <>
              {/* SECCIÓN 1: MÉTRICAS RÁPIDAS */}
              <section aria-labelledby="metrics-heading">
                <h2 id="metrics-heading" className="sr-only">
                  Quick Metrics Summary
                </h2>
                <AnimeStatsCards
                  totalMinutes={stats.totalMinutes}
                  avgScore={stats.averageScore}
                  topGenre={topItems.topGenre}
                  favoriteStudio={topItems.favoriteStudio}
                />
              </section>

              {/* SECCIÓN 2: GRÁFICOS INTERACTIVOS */}
              <section
                className="rounded-xl border bg-card p-2 shadow-sm"
                aria-labelledby="charts-heading"
              >
                <div className="p-4 border-b mb-4">
                  <h2
                    id="charts-heading"
                    className="text-lg font-bold uppercase tracking-tight"
                  >
                    Genre and Studio Distribution
                  </h2>
                </div>
                <div>
                  <InteractiveStatsChart
                    genreFrequency={stats.genreFrequency}
                    studioFrequency={stats.studioFrequency}
                  />
                </div>
              </section>
            </>
          )}

          {/* SECCIÓN 3: LISTADO DETALLADO */}
          <section className="space-y-4" aria-labelledby="table-heading">
            <div className="flex items-center justify-between">
              <h2
                id="table-heading"
                className="text-xl font-black uppercase italic tracking-tight"
              >
                Detailed <span className="text-primary">History</span>
              </h2>
            </div>

            <div className="rounded-md border bg-card shadow-sm">
              <DataTable
                columns={columns}
                data={watchedList}
                maxSheetSize={false}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
