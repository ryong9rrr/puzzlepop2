import { create } from "zustand";

interface InGameStore {
  time: number;
  setTime: (time: number) => void;
}

export const useInGameStore = create<InGameStore>(set => ({
  time: 0,
  setTime: (time: number) => set({ time }),
}));
