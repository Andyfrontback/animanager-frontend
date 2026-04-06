import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Custom Utilities ---
function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0],
  );
  return newArray;
}

export interface TierCategory {
  id: string;
  name: string;
  color: string;
  animeIds: number[];
}

interface TierListState {
  categories: TierCategory[];

  // --- DND Actions ---
  reorderAnimeWithinCategory: (
    categoryId: string,
    oldIndex: number,
    newIndex: number,
  ) => void;
  moveAnimeBetweenCategories: (
    animeId: number,
    sourceCategoryId: string,
    targetCategoryId: string,
    targetIndex: number,
  ) => void;
  addAnimeToCategory: (
    animeId: number,
    categoryId: string,
    targetIndex?: number,
  ) => void;
  removeAnimeFromCategory: (animeId: number, categoryId: string) => void;
  reorderCategories: (oldIndex: number, newIndex: number) => void;

  // --- Category Management ---
  addCategory: (category: Omit<TierCategory, "id" | "animeIds">) => void;
  updateCategory: (
    id: string,
    data: Partial<Omit<TierCategory, "id" | "animeIds">>,
  ) => void;
  removeCategory: (id: string) => void;

  // --- Data Integrity ---
  syncWithWatchedList: (validWatchedIds: number[]) => void;
}

const DEFAULT_CATEGORIES: TierCategory[] = [
  { id: "s", name: "S", color: "#ff7f7f", animeIds: [] },
  { id: "a", name: "A", color: "#ffbf7f", animeIds: [] },
  { id: "b", name: "B", color: "#ffff7f", animeIds: [] },
  { id: "c", name: "C", color: "#7fff7f", animeIds: [] },
  { id: "d", name: "D", color: "#7fbfff", animeIds: [] },
];

export const useTierListStore = create<TierListState>()(
  persist(
    (set) => ({
      categories: DEFAULT_CATEGORIES,

      reorderAnimeWithinCategory: (categoryId, oldIndex, newIndex) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  animeIds: arrayMove(cat.animeIds, oldIndex, newIndex),
                }
              : cat,
          ),
        })),

      moveAnimeBetweenCategories: (
        animeId,
        sourceCategoryId,
        targetCategoryId,
        targetIndex,
      ) =>
        set((state) => {
          return {
            categories: state.categories.map((cat) => {
              if (cat.id === sourceCategoryId) {
                return {
                  ...cat,
                  animeIds: cat.animeIds.filter((id) => id !== animeId),
                };
              }
              if (cat.id === targetCategoryId) {
                const newAnimeIds = [...cat.animeIds];
                newAnimeIds.splice(targetIndex, 0, animeId);
                return { ...cat, animeIds: newAnimeIds };
              }
              return cat;
            }),
          };
        }),

      addAnimeToCategory: (animeId, categoryId, targetIndex) =>
        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.id !== categoryId) return cat;

            const newAnimeIds = [...cat.animeIds];
            if (targetIndex !== undefined) {
              newAnimeIds.splice(targetIndex, 0, animeId);
            } else {
              newAnimeIds.push(animeId);
            }
            return { ...cat, animeIds: newAnimeIds };
          }),
        })),

      removeAnimeFromCategory: (animeId, categoryId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  animeIds: cat.animeIds.filter((id) => id !== animeId),
                }
              : cat,
          ),
        })),

      reorderCategories: (oldIndex, newIndex) =>
        set((state) => ({
          categories: arrayMove(state.categories, oldIndex, newIndex),
        })),

      addCategory: (categoryData) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...categoryData, id: crypto.randomUUID(), animeIds: [] },
          ],
        })),

      updateCategory: (id, data) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...data } : cat,
          ),
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        })),

      syncWithWatchedList: (validWatchedIds) =>
        set((state) => {
          const validIdsSet = new Set(validWatchedIds);
          let hasChanges = false;

          const updatedCategories = state.categories.map((cat) => {
            const filteredIds = cat.animeIds.filter((id) =>
              validIdsSet.has(id),
            );
            if (filteredIds.length !== cat.animeIds.length) {
              hasChanges = true;
            }
            return { ...cat, animeIds: filteredIds };
          });

          return hasChanges ? { categories: updatedCategories } : state;
        }),
    }),
    { name: "tierlist-storage" },
  ),
);
