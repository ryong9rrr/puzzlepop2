import { Puzzle } from "@puzzlepop2/game-core";
import { create } from "zustand";

interface SingleGamePageStore {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle) => void;
}

export const useSingleGamePage = create<SingleGamePageStore>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => set({ selectedPuzzle: puzzle }),
}));
