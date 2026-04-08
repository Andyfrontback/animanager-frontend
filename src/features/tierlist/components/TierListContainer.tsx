import React, { useEffect, useMemo, useState, type ReactNode } from "react";
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
import { Link } from "react-router";

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

    // Solo calculamos si hay cambios reales necesarios
    const orphans = Object.values(distribution)
      .flat()
      .some((id) => !validIds.has(id));
    const newAnimes = watchedList.filter(
      (a) => !allDistributedIds.has(a.mal_id),
    );

    if (orphans || newAnimes.length > 0) {
      const updated = { ...distribution };

      // Limpieza y adición
      (Object.keys(updated) as TierId[]).forEach((k) => {
        updated[k] = updated[k].filter((id) => validIds.has(id));
      });

      updated.bench = [...updated.bench, ...newAnimes.map((a) => a.mal_id)];

      setDistribution(updated);
      setLocalDistribution(updated);
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
    if (event.operation.source?.type !== "item") return;
    setLocalDistribution((prev) => move(prev, event));
  };

  const handleDragEnd: NonNullable<
    React.ComponentProps<typeof DragDropProvider>["onDragEnd"]
  > = (event) => {
    // IMPORTANTE: Si se cancela, revertimos al estado del store (el último persistido)
    if (event.canceled) {
      setLocalDistribution(distribution);
      return;
    }
    setDistribution(localDistribution);
  };

  // 6. Helper de Renderizado para evitar duplicidad
  const renderAnimeCards = (ids: number[], containerId: string) => {
    return ids.map((id, index) => {
      const anime = animeMap.get(id);
      if (!anime) return null;
      return (
        <AnimeDraggableCard
          key={id}
          anime={anime}
          index={index}
          containerId={containerId}
        />
      );
    });
  };

  const renderBenchMessage = (text: ReactNode) => {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center text-neutral-500 italic">
        {text}
      </div>
    );
  };

  return (
    <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
        {/* Tier Rows Section */}
        <div className="flex flex-col rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
          {tiers.map((tier) => (
            <TierRow key={tier.id} category={tier}>
              {localDistribution[tier.id].length === 0 ? (
                <div className="w-full min-h-20 flex items-center justify-center text-neutral-600 text-xs font-bold border-2 border-dashed border-neutral-700/50 rounded-lg uppercase tracking-widest pointer-events-none">
                  Drag anime here
                </div>
              ) : (
                renderAnimeCards(localDistribution[tier.id], tier.id)
              )}
            </TierRow>
          ))}
        </div>

        {/* Bench Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-neutral-200 tracking-tight">
              Unranked
              <span className="ml-3 text-sm font-normal text-neutral-500">
                ({localDistribution.bench.length} unranked anime)
              </span>
            </h3>
          </div>

          <AnimeBench benchId="bench">
            {watchedList.length === 0
              ? renderBenchMessage(
                  <>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      To build your custom tierlist, we need to know what you've
                      watched. Start adding anime to your watched list
                    </p>

                    <Link to="/feature/anime/list">
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold">
                        Start Adding Anime
                      </button>
                    </Link>
                  </>,
                )
              : localDistribution.bench.length === 0
                ? renderBenchMessage(<p>✨ All anime have been ranked ✨</p>)
                : renderAnimeCards(localDistribution.bench, "bench")}
          </AnimeBench>
        </div>
      </div>

      {/* Overlay para el feedback visual durante el drag */}
      <TierListDragOverlay />
    </DragDropProvider>
  );
};
