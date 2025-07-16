import { createStore } from "zustand/vanilla";

export type Piece = {
  groupId: number | null;
  index: number;
  paperGroup: paper.Group;
};

interface PieceStore {
  reset: () => void;

  pieces: Piece[];
  setPieces: (pieces: Piece[]) => void;
}

export const pieceStore = createStore<PieceStore>(set => ({
  reset: () => set({ pieces: [] }),

  pieces: [],
  setPieces: pieces => set({ pieces }),
}));
