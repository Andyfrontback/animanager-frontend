import { Button } from "@/components/ui/button";
import { useTopCurrentAnimes } from "../hooks/useTopCurrentAnimes";
import { AnimeCard } from "./AnimeCard";
import type { getTopCurrentAnimesInput } from "../schemas/anime.schema";

export const TopCurrentAnimes = (props: getTopCurrentAnimesInput) => {
  const { data, error, loading, fetch, paginateOptions } =
    useTopCurrentAnimes(props);

  // 2. Renderizamos los distintos estados
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

      <Button size="lg" onClick={() => fetch(paginateOptions)}>
        Cargar de nuevo
      </Button>
    </section>
  );
};
