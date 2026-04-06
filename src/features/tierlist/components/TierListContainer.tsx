import { useEffect, useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { PointerSensor, KeyboardSensor } from "@dnd-kit/dom";
import { useWatchedStore } from "@/stores/watched.store";
import { useTierListStore } from "@/stores/tierlist.store";

import { TierListDragMonitor } from "./TierListDragMonitor";
// Placeholders
import { TierRow } from "./TierRow";
import { AnimeBench } from "./AnimeBench";
import { TierListDragOverlay } from "./TierListDragOverlay";

export const TierListContainer = () => {
  const { watchedList } = useWatchedStore();
  const { categories, cleanInvalidIds } = useTierListStore();

  // Estado para el DragOverlay (lo pasaremos al monitor para que lo actualice)
  const [, setActiveId] = useState<number | null>(null);

  // 1. Sincronización: Limpieza automática
  useEffect(() => {
    const validIds = watchedList.map((anime) => anime.mal_id);
    cleanInvalidIds(validIds);
  }, [watchedList, cleanInvalidIds]);

  // 2. Derivación de la Banca
  const benchAnimes = useMemo(() => {
    const idsInTiers = new Set(categories.flatMap((cat) => cat.animeIds));
    return watchedList.filter((anime) => !idsInTiers.has(anime.mal_id));
  }, [watchedList, categories]);

  return (
    <DragDropProvider sensors={[PointerSensor, KeyboardSensor]}>
      {/* Nuestro nuevo monitor de eventos inyectado en el Provider */}
      <TierListDragMonitor setActiveId={setActiveId} />

      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Sección Superior: Tier List */}
        <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900/50">
          {categories.map((category) => (
            <TierRow
              key={category.id}
              category={category}
              watchedList={watchedList}
            />
          ))}
        </div>

        {/* Sección Inferior: La Banca */}
        <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
          <h3 className="text-xl font-bold mb-4 text-neutral-200">
            Banca ({benchAnimes.length})
          </h3>
          <AnimeBench animes={benchAnimes} benchId="bench" />
        </div>
      </div>

      {/* Drag Overlay */}
      <TierListDragOverlay />
    </DragDropProvider>
  );
};
