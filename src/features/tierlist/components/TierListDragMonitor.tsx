import { useDragDropMonitor } from "@dnd-kit/react";
import { useTierListStore } from "@/stores/tierlist.store";

interface TierListDragMonitorProps {
  setActiveId: (id: number | null) => void;
}

export const TierListDragMonitor = ({
  setActiveId,
}: TierListDragMonitorProps) => {
  const { categories, moveAnime } = useTierListStore();

  useDragDropMonitor({
    onDragStart(event) {
      setActiveId(event.operation.source?.id as number);
    },
    onDragOver(event) {
      const { source, target } = event.operation;
      if (!target) return;

      const activeContainer = source?.data?.containerId;
      const overContainer = target?.data?.containerId || target?.id;

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return;
      }

      // Verificamos si el target es una categoría vacía o un elemento específico
      const isOverCategory = categories.some((c) => c.id === target.id);
      const overIndex = isOverCategory
        ? categories.find((c) => c.id === target.id)?.animeIds.length
        : target?.data?.index;

      moveAnime(
        source?.id as number,
        activeContainer,
        overContainer,
        overIndex,
      );
    },
    onDragEnd(event) {
      const { operation, canceled } = event;
      setActiveId(null);

      // Si se cancela (ej. con la tecla ESC) o no hay target, abortamos
      if (canceled || !operation.target) return;

      const { source, target } = operation;
      const activeContainer = source?.data?.containerId;
      const overContainer = target?.data?.containerId || target?.id;

      if (
        activeContainer &&
        overContainer &&
        activeContainer === overContainer
      ) {
        // Reordenamiento final dentro de la misma fila/banca
        const oldIndex = source?.data?.index;
        const newIndex = target?.data?.index;

        if (oldIndex !== newIndex && newIndex !== undefined) {
          moveAnime(
            source?.id as number,
            activeContainer,
            overContainer,
            newIndex,
          );
        }
      }
    },
  });

  return null;
};
/* 
import { useEffect, useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { PointerSensor, KeyboardSensor } from "@dnd-kit/dom";
import { useWatchedStore } from "@/stores/watched.store";
import { useTierListStore } from "@/stores/tierlist.store";

// Placeholders
import { TierRow } from "./TierRow";
import { AnimeBench } from "./AnimeBench";
import { TierListDragOverlay } from "./TierListDragOverlay";
import { AnimeDraggableCard } from "./AnimeDraggableCard";
import type { Anime } from "@/models";
import { move } from "@dnd-kit/helpers";

export const TierListContainer = () => {
  const watchedList = useWatchedStore((s) => s.watchedList);
  const setWatchedList = useMemo(
    () =>
      new Map<number, Anime>(watchedList.map((anime) => [anime.mal_id, anime])),
    [watchedList],
  );
  const categories = useTierListStore((s) => s.categories);
  const cleanInvalidIds = useTierListStore((s) => s.cleanInvalidIds);

  // 1. Sincronización: Limpieza automática
  useEffect(() => {
    const validIds = watchedList.map((anime) => anime.mal_id);
    cleanInvalidIds(validIds);
  }, [watchedList, cleanInvalidIds]);

  // 2. Calculamos el valor "teórico" de la banca (lo que debería haber según los stores)
  const derivedBench = useMemo(() => {
    const idsInTiers = new Set(categories.flatMap((cat) => cat.animeIds));
    return watchedList.filter((anime) => !idsInTiers.has(anime.mal_id));
  }, [watchedList, categories]);

  // 3. Creamos el estado "Linkeado"
  const [, setTierList] = useState({
    ...categories,
    bench: derivedBench,
  });

  return (
    <DragDropProvider
      sensors={[PointerSensor, KeyboardSensor]}
      onDragOver={(event) => {
        setTierList((items) => move(items, event));
      }}
    >
      {/* Nuestro nuevo monitor de eventos inyectado en el Provider 
      <TierListDragMonitor setActiveId={setActiveId} />

      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900/50">
          {categories.map((category) => (
            <TierRow key={category.id} category={category}>
              {category.animeIds.map((animeId, index) => {
                const anime = setWatchedList.get(animeId);

                if (!anime) return null;

                <AnimeDraggableCard
                  key={animeId}
                  index={index}
                  containerId={category.id}
                  anime={anime}
                />;
              })}
            </TierRow>
          ))}
        </div>


        <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
          <h3 className="text-xl font-bold mb-4 text-neutral-200">
            Banca ({derivedBench.length})
          </h3>
          <AnimeBench benchId="bench">
            {derivedBench.map((anime, index) => (
              <AnimeDraggableCard
                key={anime.mal_id}
                index={index}
                containerId="bench"
                anime={anime}
              />
            ))}
          </AnimeBench>
        </div>
      </div>


      <TierListDragOverlay />
    </DragDropProvider>
  );
}; */
