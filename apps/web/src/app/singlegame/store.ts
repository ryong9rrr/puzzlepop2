import { create } from "zustand";
import { GameLevel } from "@puzzlepop2/game-core";
import { SingleGamePuzzle } from "@/remotes/puzzles/types";

interface SingleGamePageStore {
  selectedPuzzle: SingleGamePuzzle | null;
  setSelectedPuzzle: (puzzle: SingleGamePuzzle) => void;
  selectedLevel: GameLevel | null;
  setSelectedLevel: (level: GameLevel) => void;
}

export const useSingleGamePage = create<SingleGamePageStore>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => {
    set({ selectedPuzzle: puzzle, selectedLevel: null });
  },
  selectedLevel: null,
  setSelectedLevel: level => {
    set({ selectedLevel: level });
  },
}));
