// pages/AnimeListPage.tsx
import ErrorBoundary from "@/ErrorBoundary"; // Tu componente custom
import { AnimeList } from "@/features/anime/components/AnimeList";

export const AnimeListPage = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">Catálogo de Anime</h1>

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
