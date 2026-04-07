// @/stores/browser.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BrowserState {
  // Guardamos los filtros como un objeto plano
  lastSearchParams: Record<string, string>;
  hasSeenTutorial: boolean;

  // Actions
  setLastSearchParams: (params: Record<string, string>) => void;
  setHasSeenTutorial: (status: boolean) => void;
  resetBrowserSettings: () => void;
}

export const useBrowserStore = create<BrowserState>()(
  persist(
    (set) => ({
      lastSearchParams: {},
      hasSeenTutorial: false,

      setLastSearchParams: (params) => set({ lastSearchParams: params }),
      setHasSeenTutorial: (status) => set({ hasSeenTutorial: status }),
      resetBrowserSettings: () =>
        set({ lastSearchParams: {}, hasSeenTutorial: false }),
    }),
    { name: "browser-utilities-storage" },
  ),
);
