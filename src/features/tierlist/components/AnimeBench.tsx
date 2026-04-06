import { useDroppable } from "@dnd-kit/react";
import type { Anime } from "@/models";
/* import { AnimeCard } from "./AnimeCard"; */

interface AnimeBenchProps {
  animes: Anime[];
  benchId: string;
}

export const AnimeBench = ({ animes, benchId }: AnimeBenchProps) => {
  // 1. Configuramos la banca como un contenedor Droppable.
  // Es vital pasar el benchId en la propiedad data para que el DragMonitor
  // sepa interpretar cuándo un anime vuelve a la banca.
  const { ref, isDropTarget } = useDroppable({
    id: benchId,
    data: {
      containerId: benchId,
    },
  });

  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-3 min-h-37.5 p-4 rounded-lg transition-colors duration-200 border-2 ${
        isDropTarget
          ? "bg-white/5 border-neutral-500 border-solid"
          : "bg-transparent border-neutral-800 border-dashed"
      }`}
    >
      {/* {animes.map((anime, index) => (
        <AnimeCard
          key={anime.mal_id}
          anime={anime}
          index={index}
          containerId={benchId}
        />
      ))} */}

      {/* Empty State de Victoria */}
      {animes.length === 0 && (
        <div className="w-full flex items-center justify-center text-neutral-500 text-sm md:text-base font-medium pointer-events-none select-none">
          ✨ Todos los animes han sido clasificados ✨
        </div>
      )}
    </div>
  );
};
