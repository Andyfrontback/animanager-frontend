import type { Anime } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchedState {
  watchedList: Anime[];
  // Actions
  addAnime: (anime: Anime) => void;
  removeAnime: (animeId: number) => void;
  toggleAnime: (anime: Anime) => void;
}

export const useWatchedStore = create<WatchedState>()(
  persist(
    (set, get) => ({
      watchedList: [],

      addAnime: (anime) => {
        // Evitar duplicados por seguridad
        const exists = get().watchedList.some((a) => a.mal_id === anime.mal_id);
        if (!exists) {
          set((state) => ({ watchedList: [...state.watchedList, anime] }));
        }
      },

      removeAnime: (animeId) =>
        set((state) => ({
          watchedList: state.watchedList.filter((a) => a.mal_id !== animeId),
        })),

      toggleAnime: (anime) => {
        const { watchedList, addAnime, removeAnime } = get();
        const isWatched = watchedList.some((a) => a.mal_id === anime.mal_id);

        if (isWatched) {
          removeAnime(anime.mal_id);
        } else {
          addAnime(anime);
        }
      },
    }),
    { name: "watched-storage" },
  ),
);
