import { AnimeCard } from "./AnimeCard";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import {
  searchPanelSchema,
  type SearchPanelInput,
} from "../schemas/anime.schema";
import { ToggleWatchedButton } from "./ToggleWatchedButton";
import { Eye, ScanEye } from "lucide-react";
import { AnimesPagination } from "./AnimesPagination";
import { useAnimeListSearchQuery } from "../hooks";
import { cn } from "@/lib/utils";
import { AnimeCardSkeleton } from "./AnimeCardSkeleton";
import { AnimeListError } from "./AnimeListError";
import { DEFAULT_VALUES } from "../types/animeComp.types";

export const AnimeList = () => {
  // 1. Obtenemos la data de la query Url
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Parseamos los query params de forma segura
  const parsedParams = useMemo(() => {
    const newSearchParams = Object.fromEntries(searchParams);
    return searchPanelSchema.safeParse(newSearchParams);
  }, [searchParams]);

  // 3. Protegemos el hook: Si la URL es inválida, le pasamos los defaults para que TanStack Query no intente hacer una petición con datos rotos.
  const queryData = parsedParams.success ? parsedParams.data : DEFAULT_VALUES;

  // 4. Ejecutamos nuestra query con el custom hook
  const { isPending, isError, data, error, refetch, isFetching } =
    useAnimeListSearchQuery(queryData as SearchPanelInput);

  // 5. Interceptamos el error de Zod antes de renderizar la lista
  if (!parsedParams.success) {
    const zodErrorMsg =
      parsedParams.error.issues[0].message ||
      "Los filtros aplicados no son válidos.";

    return (
      <AnimeListError
        errorMessage={`Invalid filters: ${zodErrorMsg} ${typeof zodErrorMsg}`}
        resetErrorBoundary={() => setSearchParams(DEFAULT_VALUES)}
        resetErrorButtonMessage="Reset Filters"
      />
    );
  }

  // 4. Renderizamos los distintos estados
  if (isError) {
    return (
      <AnimeListError
        errorMessage={error.message}
        resetErrorBoundary={() => refetch()}
      />
    );
  }

  if (isPending) {
    return (
      <section className="flex flex-col justify-center items-center gap-8 ">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/* Renderizamos 12 skeletons (límite escogido de paginación) */}
          {Array.from({ length: 12 }).map((_, index) => (
            <AnimeCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col justify-center items-center gap-8",
        isFetching ? "opacity-30" : "",
      )}
    >
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
                    isWatched:
                      "bg-primary text-white hover:bg-primary-hover hover:text-gray-300",
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
