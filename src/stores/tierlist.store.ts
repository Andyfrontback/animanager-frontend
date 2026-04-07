// store/useTierListStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 1. Tipados estrictos para las filas y la distribución
export type TierId = "s" | "a" | "b" | "c" | "d" | "bench";

export type TierDistribution = Record<TierId, number[]>; //Number es del mismo tipo que Anime.mal_id

// 2. Interfaz del Estado y las Acciones
interface TierListState {
  distribution: TierDistribution;
}

interface TierListActions {
  // Actualiza toda la distribución (ideal para onDragEnd)
  setDistribution: (newDistribution: TierDistribution) => void;
  // Limpia IDs que ya no existen en la watchedList
  syncWithWatchedList: (validIds: Set<number>) => void;
  // Resetea todo a la banca
  resetToBench: () => void;
}

export type TierListStore = TierListState & TierListActions;

// 3. Estado inicial por defecto
const initialDistribution: TierDistribution = {
  s: [],
  a: [],
  b: [],
  c: [],
  d: [],
  bench: [],
};

// 4. Creación del Store con persistencia
export const useTierListStore = create<TierListStore>()(
  persist(
    (set) => ({
      distribution: initialDistribution,

      setDistribution: (newDistribution) =>
        set({ distribution: newDistribution }),

      syncWithWatchedList: (validIds) =>
        set((state) => {
          const newDistribution = { ...state.distribution };
          let hasChanges = false;

          // Iteramos sobre cada tier para filtrar los IDs huérfanos
          (Object.keys(newDistribution) as TierId[]).forEach((tier) => {
            const currentIds = newDistribution[tier];
            const filteredIds = currentIds.filter((id) => validIds.has(id));

            if (currentIds.length !== filteredIds.length) {
              newDistribution[tier] = filteredIds;
              hasChanges = true;
            }
          });

          // Solo actualizamos el estado si hubo cambios reales para evitar re-renders innecesarios
          return hasChanges ? { distribution: newDistribution } : {};
        }),

      resetToBench: () =>
        set((state) => {
          const allIds = Object.values(state.distribution).flat();
          return {
            distribution: {
              ...initialDistribution,
              bench: allIds, // Movemos todos los IDs a la banca
            },
          };
        }),
    }),
    {
      name: "tierlist-storage",
      // Opcional: Puedes omitir acciones o filtrar qué se guarda,
      // pero por ahora guardar todo el objeto `distribution` es perfecto.
    },
  ),
);

// 5. Diseño de implementación del store
export interface TierCategory {
  id: string;
  name: string;
  color: string;
}

export const currentCategories: Record<
  Exclude<TierId, "bench">,
  TierCategory
> = {
  s: { id: "tier-s", name: "S", color: "#ef4444" }, // Tailwind red-500
  a: { id: "tier-a", name: "A", color: "#eab308" }, // Tailwind yellow-500
  b: { id: "tier-b", name: "B", color: "#22c55e" }, // Tailwind green-500
  c: { id: "tier-c", name: "C", color: "#3b82f6" }, // Tailwind blue-500
  d: { id: "tier-d", name: "D", color: "#6b7280" }, // Tailwind gray-500
};
