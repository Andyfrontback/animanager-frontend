import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TierCategory {
  id: string;
  name: string;
  color: string;
  animeIds: number[];
}

interface TierListState {
  categories: TierCategory[];
  // Actions
  moveAnime: (
    animeId: number,
    sourceId: string | "bench",
    destinationId: string | "bench",
    newIndex?: number,
  ) => void;
  addCategory: (name: string, color: string) => void;
  updateCategory: (
    id: string,
    updates: Partial<Omit<TierCategory, "id" | "animeIds">>,
  ) => void;
  reorderCategories: (oldIndex: number, newIndex: number) => void;
  cleanInvalidIds: (validAnimeIds: number[]) => void;
}

const defaultCategories: TierCategory[] = [
  { id: "tier-s-plus", name: "S+", color: "#ef4444", animeIds: [] }, // Tailwind red-500
  { id: "tier-s", name: "S", color: "#f97316", animeIds: [] }, // Tailwind orange-500
  { id: "tier-a", name: "A", color: "#eab308", animeIds: [] }, // Tailwind yellow-500
  { id: "tier-b", name: "B", color: "#22c55e", animeIds: [] }, // Tailwind green-500
  { id: "tier-c", name: "C", color: "#3b82f6", animeIds: [] }, // Tailwind blue-500
  { id: "tier-d", name: "D", color: "#6b7280", animeIds: [] }, // Tailwind gray-500
];

export const useTierListStore = create<TierListState>()(
  persist(
    (set) => ({
      categories: defaultCategories,

      // Lógica unificada para Drag and Drop
      moveAnime: (animeId, sourceId, destinationId, newIndex) =>
        set((state) => {
          const newCategories = [...state.categories];

          // 1. Remover del origen (si no viene de la banca)
          if (sourceId !== "bench") {
            const sourceIndex = newCategories.findIndex(
              (c) => c.id === sourceId,
            );
            if (sourceIndex > -1) {
              newCategories[sourceIndex] = {
                ...newCategories[sourceIndex],
                animeIds: newCategories[sourceIndex].animeIds.filter(
                  (id) => id !== animeId,
                ),
              };
            }
          }

          // 2. Insertar en el destino (si no va hacia la banca)
          if (destinationId !== "bench") {
            const destIndex = newCategories.findIndex(
              (c) => c.id === destinationId,
            );
            if (destIndex > -1) {
              const destIds = [...newCategories[destIndex].animeIds];
              // Si no se especifica un índice válido, se inserta al final
              const insertIndex =
                newIndex !== undefined && newIndex >= 0
                  ? newIndex
                  : destIds.length;

              // Evitar duplicados por seguridad
              if (!destIds.includes(animeId)) {
                destIds.splice(insertIndex, 0, animeId);
                newCategories[destIndex] = {
                  ...newCategories[destIndex],
                  animeIds: destIds,
                };
              }
            }
          }

          return { categories: newCategories };
        }),

      addCategory: (name, color) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { id: crypto.randomUUID(), name, color, animeIds: [] },
          ],
        })),

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...updates } : cat,
          ),
        })),

      reorderCategories: (oldIndex, newIndex) =>
        set((state) => {
          const newCategories = [...state.categories];
          const [movedCategory] = newCategories.splice(oldIndex, 1);
          newCategories.splice(newIndex, 0, movedCategory);
          return { categories: newCategories };
        }),

      // Ejecutar esto en un useEffect en el contenedor principal o como middleware
      cleanInvalidIds: (validAnimeIds) =>
        set((state) => {
          const validSet = new Set(validAnimeIds);
          let hasChanges = false;

          const cleanedCategories = state.categories.map((cat) => {
            const filteredIds = cat.animeIds.filter((id) => validSet.has(id));
            if (filteredIds.length !== cat.animeIds.length) {
              hasChanges = true;
              return { ...cat, animeIds: filteredIds };
            }
            return cat;
          });

          return hasChanges ? { categories: cleanedCategories } : state;
        }),
    }),
    {
      name: "tier-list-storage",
    },
  ),
);
