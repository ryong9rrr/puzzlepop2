import { create } from "zustand";
import { SingleGameLevelType } from "@puzzlepop2/game-core";
import { Puzzle } from "@shared-types/single";

interface SelectPuzzleStoreProps {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle) => void;

  selectedLevel: SingleGameLevelType | null;
  setSelectedLevel: (level: SingleGameLevelType) => void;
}

export const useSelectPuzzleStore = create<SelectPuzzleStoreProps>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => {
    set({ selectedPuzzle: puzzle, selectedLevel: null });
  },

  selectedLevel: null,
  setSelectedLevel: level => {
    set({ selectedLevel: level });
  },
}));
