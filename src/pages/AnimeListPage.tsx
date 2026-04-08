import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";

import ErrorBoundary from "@/ErrorBoundary";
import { AnimeList } from "@/features/anime/components/AnimeList";
import { AnimeSearchPanel } from "@/features/anime/components/AnimeSearchPanel";
import { DEFAULT_VALUES } from "@/features/anime/types/animeComp.types";
import { useBrowserStore } from "@/stores/browser.store";

import { siteBaseUrl } from "./constants";
import alyaImg from "@/assets/imgs/alya.webp";

const pageUrl = `${siteBaseUrl}/private/anime/list`;
const ogImage = new URL(alyaImg, siteBaseUrl).href;

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
        {/* Core Meta - Todo unificado al Inglés */}
        <title>Browse Anime | AniManager</title>
        <meta
          name="description"
          content="Search and filter through thousands of anime series. Find your next favorite show by season, genre, or community score."
        />
        {/* El Canonical apunta a la base sin Query Params para evitar que Google 
          indexe URLs duplicadas como /browse?genre=action y /browse?genre=comedy 
          como páginas totalmente distintas si no quieres que compitan entre sí.
        */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:title"
          content="Browse Anime Database | AniManager"
        />
        <meta
          property="og:description"
          content="Search and filter through thousands of anime series. Find your next favorite show by season, genre, or community score."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="AniManager Anime Database Search Interface"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta
          name="twitter:title"
          content="Browse Anime Database | AniManager"
        />
        <meta
          name="twitter:description"
          content="Search and filter through thousands of anime series. Find your next favorite show by season, genre, or community score."
        />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* Contenido principal, no se necesita main ya que esta indicado por el Layout */}
      <div className="min-h-screen w-full py-6 px-4 md:px-8 space-y-8">
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
          <search
            aria-label="Anime search and filters"
            className="w-full md:w-auto"
          >
            <AnimeSearchPanel />
          </search>
        </header>

        {/* Separador visual sutil */}
        <hr className="border-border max-w-7xl mx-auto" aria-hidden="true" />

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
      </div>
    </>
  );
};
