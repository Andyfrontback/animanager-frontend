import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TierCategory {
  id: string;
  name: string;
  color: string;
  animeIds: number[];
}

interface TierListState {
  categories: Record<string, string[]>;
  // Actions
  updateAllCategories: (categories: Record<string, string[]>) => void;
  /* moveAnime: (
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
  cleanInvalidIds: (validAnimeIds: number[]) => void; */
}

/* const defaultCategories: TierCategory[] = [
  { id: "tier-s-plus", name: "S+", color: "#ef4444", animeIds: [] }, // Tailwind red-500
  { id: "tier-s", name: "S", color: "#f97316", animeIds: [] }, // Tailwind orange-500
  { id: "tier-a", name: "A", color: "#eab308", animeIds: [] }, // Tailwind yellow-500
  { id: "tier-b", name: "B", color: "#22c55e", animeIds: [] }, // Tailwind green-500
  { id: "tier-c", name: "C", color: "#3b82f6", animeIds: [] }, // Tailwind blue-500
  { id: "tier-d", name: "D", color: "#6b7280", animeIds: [] }, // Tailwind gray-500
]; */

const defaultTest = {
  A: ["A0", "A1", "A2"],
  B: ["B0", "B1"],
  C: ["C0"],
  bench: ["D1", "D2"],
};

export const useTierListStore = create<TierListState>()(
  persist(
    (set) => ({
      categories: defaultTest,

      updateAllCategories: (categories) => set({ categories }),
    }),
    {
      name: "tier-list-storage",
    },
  ),
);
