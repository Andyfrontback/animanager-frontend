import { AnimeCard } from "./AnimeCard";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { searchPanelSchema } from "../schemas/anime.schema";
import { ToggleWatchedButton } from "./ToggleWatchedButton";
import { Eye, ScanEye } from "lucide-react";
import { AnimesPagination } from "./AnimesPagination";
import { useAnimeListSearchQuery } from "../hooks";

export const AnimeList = () => {
  // 1. Obtenemos la data de la query Url
  const [searchParams] = useSearchParams();

  // 2. Limpiamos la data
  const queryParams = useMemo(() => {
    const newSearchParams = Object.fromEntries(searchParams);
    return searchPanelSchema.parse(newSearchParams);
  }, [searchParams]);

  // 3. Usamos nuestro custom hook para esta query
  const { isPending, isError, data, error } =
    useAnimeListSearchQuery(queryParams);

  // 4. Renderizamos los distintos estados
  if (isError) return <p>{error.message}</p>;

  if (isPending) return <p>Cargando...</p>;

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.data?.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              actionSlot={
                <ToggleWatchedButton
                  className={{
                    base: "absolute z-20 transition-all duration-300 shadow-sm backdrop-blur-md left-0 bottom-0 h-10 w-10 rounded-tr-xl rounded-bl-none rounded-tl-none rounded-br-none md:rounded-full md:left-auto md:bottom-auto md:top-1 md:right-1",
                    isNotWatched:
                      "bg-black/60 text-white/90 hover:bg-black/80 hover:text-white",
                    isWatched: "bg-emerald-500 text-white hover:bg-emerald-600",
                  }}
                  anime={anime}
                  children={{
                    isWatched: <ScanEye className="h-4 w-4" />,
                    isNotWatched: <Eye className="h-4 w-4" />,
                  }}
                />
              }
            />
          ))}
      </div>

      {data?.pagination && (
        <AnimesPagination
          current_page={data.pagination.current_page}
          last_visible_page={data.pagination.last_visible_page}
        />
      )}
    </section>
  );
};
