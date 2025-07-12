import { create } from "zustand";

interface InGameDataStore {
  time: number;
  setTime: (time: number) => void;
}

export const useInGameDataStore = create<InGameDataStore>(set => ({
  time: 0,
  setTime: (time: number) => set({ time }),
}));
