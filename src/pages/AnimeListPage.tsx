// pages/AnimeListPage.tsx
import ErrorBoundary from "@/ErrorBoundary";
import { AnimeList } from "@/features/anime/components/AnimeList";
import { AnimeSearchPanel } from "@/features/anime/components/AnimeSearchPanel";
import { DEFAULT_VALUES } from "@/features/anime/types/animeComp.types";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const AnimeListPage = () => {
  const [, setSearchParams] = useSearchParams();
  // 4. Hook para sincronizar defaults al montar (sin borrar lo existente)
  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        // Creamos una copia de los params actuales
        const newParams = new URLSearchParams(prevParams);
        let hasChanges = false;

        // Recorremos tus defaults
        Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
          // SOLO si la URL no tiene ese parámetro y el default tiene valor...
          if (!newParams.has(key) && value) {
            newParams.set(key, value);
            hasChanges = true;
          }
        });

        // Solo actualizamos si hubo cambios para evitar re-renders infinitos
        return hasChanges ? newParams : prevParams;
      },
      { replace: true }, // 'replace: true' evita ensuciar el historial del navegador
    );
  }, [setSearchParams]); // Dependencia estable

  return (
    <section className="flex flex-col justify-center items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">
        Browse Anime <AnimeSearchPanel />
      </h1>

      {/* El ErrorBoundary atrapa errores de red o de Zod */}
      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            ⚠️ Algo salió mal al cargar los animes.
          </p>
        }
      >
        <AnimeList />
      </ErrorBoundary>
    </section>
  );
};
