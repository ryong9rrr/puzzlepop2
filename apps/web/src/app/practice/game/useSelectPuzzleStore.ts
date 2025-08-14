import { create } from "zustand";

import { PracticePuzzle } from "../apis/types";

interface SelectPuzzleStoreProps {
  selectedPuzzle: PracticePuzzle | null;
  setSelectedPuzzle: (puzzle: PracticePuzzle) => void;
}

export const useSelectPuzzleStore = create<SelectPuzzleStoreProps>(set => ({
  selectedPuzzle: null,
  setSelectedPuzzle: puzzle => {
    set({ selectedPuzzle: puzzle });
  },
}));
