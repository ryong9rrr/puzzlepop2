import { create } from "zustand";
import { SingleGamePuzzle } from "@/remotes/puzzles/types";

interface SingleGamePageStore {
  selectedPuzzle: SingleGamePuzzle | null;
  setSelectedPuzzle: (puzzle: SingleGamePuzzle) => void;
}

export const useSingleGamePage = create<SingleGamePageStore>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => set({ selectedPuzzle: puzzle }),
}));
