import { create } from "zustand";

import { PracticePuzzle } from "../../apis/types";

type Level = "easy" | "normal" | "hard";

interface SelectPuzzleStoreProps {
  selectedPuzzle: PracticePuzzle | null;
  setSelectedPuzzle: (puzzle: PracticePuzzle) => void;

  selectedLevel: Level | null;
  setSelectedLevel: (level: Level) => void;
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
