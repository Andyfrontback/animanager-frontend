import React, { useEffect, useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

// Stores & Models
import { useWatchedStore } from "@/stores/watched.store";
import {
  useTierListStore,
  type TierId,
  type TierDistribution,
} from "@/stores/tierlist.store";
import type { Anime } from "@/models";

// Components
import { TierRow } from "./TierRow";
import { AnimeBench } from "./AnimeBench";
import { AnimeDraggableCard } from "./AnimeDraggableCard";
import { TierListDragOverlay } from "./TierListDragOverlay";

// 6. Configuración de Filas
const tiers: { id: TierId; name: string; color: string }[] = [
  { id: "s", name: "S", color: "#ff7f7f" },
  { id: "a", name: "A", color: "#ffbf7f" },
  { id: "b", name: "B", color: "#ffff7f" },
  { id: "c", name: "C", color: "#7fff7f" },
  { id: "d", name: "D", color: "#7fbfff" },
];

export const TierListContainer = () => {
  // 1. Global State & Selectors
  const watchedList = useWatchedStore((s) => s.watchedList);
  const distribution = useTierListStore((s) => s.distribution);
  const setDistribution = useTierListStore((s) => s.setDistribution);

  // 2. SoT: Mapa O(1) para hidratar IDs en tiempo de renderizado
  const animeMap = useMemo(() => {
    return new Map<number, Anime>(watchedList.map((a) => [a.mal_id, a]));
  }, [watchedList]);

  // 3. Local State (Optimistic UI)
  // Manejamos IDs directamente para que el helper 'move' sea eficiente
  const [localDistribution, setLocalDistribution] =
    useState<TierDistribution>(distribution);

  // 4. Sincronización e Integridad de Datos
  useEffect(() => {
    const validIds = new Set(animeMap.keys());
    const allDistributedIds = new Set(Object.values(distribution).flat());

    // A. Detectar huérfanos (animes en tierlist que ya no están en watchedList)
    const hasOrphans = Object.values(distribution).some((tier) =>
      tier.some((id) => !validIds.has(id)),
    );

    // B. Detectar nuevos (animes en watchedList que no están clasificados)
    const newAnimes = watchedList
      .filter((a) => !allDistributedIds.has(a.mal_id))
      .map((a) => a.mal_id);

    if (hasOrphans || newAnimes.length > 0) {
      const updatedDistribution = { ...distribution };

      // Limpiar IDs inválidos en todas las categorías
      (Object.keys(updatedDistribution) as TierId[]).forEach((key) => {
        updatedDistribution[key] = updatedDistribution[key].filter((id) =>
          validIds.has(id),
        );
      });

      // Insertar los nuevos en la banca
      updatedDistribution.bench = [...updatedDistribution.bench, ...newAnimes];

      setDistribution(updatedDistribution);
      setLocalDistribution(updatedDistribution);
    }
  }, [watchedList, animeMap, distribution, setDistribution]);

  // Sincronizar estado local si el global cambia externamente (ej. persistencia)
  useEffect(() => {
    setLocalDistribution(distribution);
  }, [distribution]);

  // 5. Handlers de dnd-kit v0.3.2
  // Extraemos el tipo exacto que espera el prop 'onDragOver' para evitar conflictos
  const handleDragOver: NonNullable<
    React.ComponentProps<typeof DragDropProvider>["onDragOver"]
  > = (event) => {
    const { operation } = event;

    if (operation.source?.type !== "item") return;

    // 'move' ahora recibirá el evento con el tipo exacto que espera
    setLocalDistribution((prev) => move(prev, event));
  };

  const handleDragEnd = () => {
    // Persistimos el movimiento en el store global (Zustand -> LocalStorage)
    setDistribution(localDistribution);
  };

  return (
    <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
        {/* Tier Rows Section */}
        <div className="flex flex-col rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
          {tiers.map((tier) => (
            <TierRow key={tier.id} category={{ ...tier }}>
              {localDistribution[tier.id].map((id, index) => {
                const anime = animeMap.get(id);
                if (!anime) return null;
                return (
                  <AnimeDraggableCard
                    key={id}
                    anime={anime}
                    index={index}
                    containerId={tier.id}
                  />
                );
              })}
            </TierRow>
          ))}
        </div>

        {/* Bench Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-neutral-200 tracking-tight">
              Banca de Espera
              <span className="ml-3 text-sm font-normal text-neutral-500">
                ({localDistribution.bench.length} animes sin clasificar)
              </span>
            </h3>
          </div>

          <AnimeBench benchId="bench">
            {localDistribution.bench.map((id, index) => {
              const anime = animeMap.get(id);
              if (!anime) return null;
              return (
                <AnimeDraggableCard
                  key={id}
                  anime={anime}
                  index={index}
                  containerId="bench"
                />
              );
            })}
          </AnimeBench>
        </div>
      </div>

      {/* Overlay para el feedback visual durante el drag */}
      <TierListDragOverlay />
    </DragDropProvider>
  );
};
