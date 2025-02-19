import { SingleGamePuzzle } from "@puzzlepop2/game-core";
import { create } from "zustand";

interface SingleGamePageStore {
  selectedPuzzle: SingleGamePuzzle | null;
  setSelectedPuzzle: (puzzle: SingleGamePuzzle) => void;
}

export const useSingleGamePage = create<SingleGamePageStore>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => set({ selectedPuzzle: puzzle }),
}));
