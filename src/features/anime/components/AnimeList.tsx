import { Button } from "@/components/ui/button";
import { AnimeCard } from "./AnimeCard";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { queryParamsSchema } from "../schemas/anime.schema";
import { useApi } from "@/hooks";
import { searchAnimesService } from "../services/anime.service";

export const AnimeList = () => {
  // 1. Obtenemos la data de la query Url
  const [searchParams] = useSearchParams();

  // 2. Limpiamos la data
  const queryParams = useMemo(() => {
    const newSearchParams = Object.fromEntries(searchParams);
    return queryParamsSchema.parse(newSearchParams);
  }, [searchParams]);

  // 3. Llamamos a nuestra implementación manual de Tanstack Query
  const { data, error, loading, fetch } = useApi(searchAnimesService, {
    autoFetch: true,
    param: queryParams,
  });

  // 4. Renderizamos los distintos estados
  if (error) return <p>{error.message}</p>;

  if (loading) return <p>Cargando...</p>;

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.data?.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
      </div>

      <Button size="lg" onClick={() => fetch(queryParams)}>
        Cargar de nuevo
      </Button>
    </section>
  );
};
