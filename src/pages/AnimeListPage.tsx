import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";

import ErrorBoundary from "@/ErrorBoundary";
import { AnimeList } from "@/features/anime/components/AnimeList";
import { AnimeSearchPanel } from "@/features/anime/components/AnimeSearchPanel";
import { DEFAULT_VALUES } from "@/features/anime/types/animeComp.types";

export const AnimeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Lógica de inicialización inteligente
  useEffect(() => {
    // Si la URL ya tiene parámetros (ej. ?q=naruto), no tocamos nada.
    if (searchParams.toString() !== "") return;

    // Si está vacía, aplicamos los defaults.
    // TIP: Aquí podrías preguntar primero a un store de Zustand persistente
    // para recuperar la "última búsqueda" del usuario.
    const params = new URLSearchParams();
    Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

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
