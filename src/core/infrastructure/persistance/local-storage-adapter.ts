import { type StorageProvider } from "./storage.protocol";

export const localStorageAdapter: StorageProvider = {
  getItem: <T>(key: string): T | null => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  setItem: <T>(key: string, value: T): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string): void => {
    window.localStorage.removeItem(key);
  },
};
