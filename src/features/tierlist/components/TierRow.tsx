import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/react";
import type { TierCategory } from "@/stores/tierlist.store";
import type { Anime } from "@/models";

import { AnimeDraggableCard } from "./AnimeDraggableCard";

interface TierRowProps {
  category: TierCategory;
  watchedList: Anime[];
}

export const TierRow = ({ category, watchedList }: TierRowProps) => {
  // 1. El "Join": Filtramos los animes de la watchedList usando los IDs de esta categoría.
  // Es crucial hacer un map sobre animeIds para mantener el orden estricto de la Tier List.
  const rowAnimes = useMemo(() => {
    return category.animeIds
      .map((id) => watchedList.find((anime) => anime.mal_id === id))
      .filter((anime): anime is Anime => anime !== undefined);
  }, [category.animeIds, watchedList]);

  // 2. Definimos la fila entera como un Droppable Target.
  // Inyectamos el containerId en la propiedad `data` para que el DragMonitor lo lea fácilmente.
  const { ref, isDropTarget } = useDroppable({
    id: category.id,
    data: {
      containerId: category.id,
    },
  });

  return (
    <div className="flex w-full min-h-25 border-b border-neutral-800 last:border-b-0 bg-neutral-900/40">
      {/* Cabecera de la Fila (Label lateral) */}
      <div
        className="flex items-center justify-center w-24 md:w-32 shrink-0 border-r border-neutral-800 shadow-inner"
        style={{ backgroundColor: category.color }}
      >
        <span className="text-neutral-950 font-black text-xl md:text-3xl drop-shadow-sm pointer-events-none">
          {category.name}
        </span>
      </div>

      {/* Zona Droppable / Grid de Animes */}
      <div
        ref={ref}
        className={`flex-1 p-3 flex flex-wrap gap-2 md:gap-3 transition-colors duration-200 ${
          isDropTarget ? "bg-white/5" : ""
        }`}
      >
        {rowAnimes.map((anime, index) => (
          <AnimeDraggableCard
            key={anime.mal_id}
            anime={anime}
            index={index}
            containerId={category.id}
          />
        ))}

        {/* Empty state para feedback visual si la fila está vacía */}
        {rowAnimes.length === 0 && (
          <div className="w-full min-h-20 flex items-center justify-center text-neutral-600 text-sm font-medium border-2 border-dashed border-neutral-700/50 rounded-lg pointer-events-none">
            Arrastra animes aquí
          </div>
        )}
      </div>
    </div>
  );
};
