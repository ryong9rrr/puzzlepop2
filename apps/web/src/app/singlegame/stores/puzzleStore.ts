import { SingleGamePuzzle } from "@puzzlepop2/game";
import { create } from "zustand";

interface PuzzleStore {
  selectedPuzzle: SingleGamePuzzle | null;
  setSelectedPuzzle: (puzzle: SingleGamePuzzle) => void;
}

export const usePuzzleStore = create<PuzzleStore>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => set({ selectedPuzzle: puzzle }),
}));
