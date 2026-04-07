import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";

import ErrorBoundary from "@/ErrorBoundary";
import { AnimeList } from "@/features/anime/components/AnimeList";
import { AnimeSearchPanel } from "@/features/anime/components/AnimeSearchPanel";
import { DEFAULT_VALUES } from "@/features/anime/types/animeComp.types";
import { useBrowserStore } from "@/stores/browser.store";

export const AnimeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lastSearchParams, setLastSearchParams } = useBrowserStore();

  // EFECTO 1: Inicialización Inteligente (Solo al montar)
  useEffect(() => {
    // Si la URL ya trae algo (ej: vienes de un link externo), respetamos la URL.
    if (searchParams.toString() !== "") return;

    const hasStoredParams = Object.keys(lastSearchParams).length > 0;

    if (hasStoredParams) {
      // Prioridad 1: Recuperar lo que el usuario estaba haciendo antes
      setSearchParams(lastSearchParams, { replace: true });
    } else {
      // Prioridad 2: Si es la primera vez, usar los valores por defecto
      const defaultParams = Object.fromEntries(
        Object.entries(DEFAULT_VALUES).filter(([, v]) => v != null),
      ) as Record<string, string>;

      setSearchParams(defaultParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al montar

  // EFECTO 2: Sincronización URL -> Store
  // Este efecto corre cada vez que searchParams cambia, manteniendo el Store al día.
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    // Evitamos actualizar si está vacío (para no pisar el store al entrar a la página)
    if (Object.keys(currentParams).length > 0) {
      setLastSearchParams(currentParams);
    }
  }, [searchParams, setLastSearchParams]);

  return (
    <>
      <Helmet>
        <title>Browse Anime</title>
        <meta
          name="description"
          content="Busca y filtra entre miles de animes. Encuentra series por temporada, género o puntuación."
        />
        <meta
          name="keywords"
          content="anime, search, browse, seasonal anime, top rated"
        />
        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Explorar el catálogo de Anime" />
        <meta
          property="og:description"
          content="Descubre tu próximo anime favorito usando nuestros filtros avanzados."
        />
      </Helmet>

      {/* ESTRUCTURA SEMÁNTICA: <main> para el contenido principal */}
      <main className="min-h-screen w-full py-6 px-4 md:px-8 space-y-8">
        {/* Encabezado con jerarquía clara */}
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
              Browse <span className="text-primary">Anime</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Explore the Jikan API database
            </p>
          </div>

          {/* El panel de búsqueda como herramienta de navegación */}
          <nav aria-label="Filtros de búsqueda" className="w-full md:w-auto">
            <AnimeSearchPanel />
          </nav>
        </header>

        {/* Separador visual sutil */}
        <div className="h-px bg-border max-w-7xl mx-auto" aria-hidden="true" />

        {/* Listado de resultados */}
        <section
          className="max-w-7xl mx-auto w-full"
          aria-labelledby="results-heading"
        >
          <h2 id="results-heading" className="sr-only">
            Search results
          </h2>

          <ErrorBoundary
            fallback={
              <div
                role="alert"
                className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-center"
              >
                <p className="font-bold">⚠️ Connection Error</p>
                <p className="text-sm">
                  We couldn't connect to the Jikan API. Please try refreshing
                  the page.
                </p>
              </div>
            }
          >
            <AnimeList />
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
};
