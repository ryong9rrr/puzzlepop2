import { createStore } from "zustand/vanilla";
import { Bundle, MultiGamePuzzlePiece, Shape } from "@puzzlepop2/game-core";

import { createShapes } from "./createShapes";

interface CanvasStore {
  widthCount: number;
  setWidthCount: (widthCount: number) => void;

  lengthCount: number;
  setLengthCount: (lengthCount: number) => void;

  pieceSize: number;
  setPieceSize: (pieceSize: number) => void;

  shapes: Shape[];
  setShapes: (board: MultiGamePuzzlePiece[][]) => void;

  bundles: Bundle[];
  setBundles: (bundles: Bundle[]) => void;

  reset: () => void;
}

export const canvasStore = createStore<CanvasStore>((set, get) => ({
  widthCount: 0,
  setWidthCount: (widthCount: number) => set({ widthCount }),

  lengthCount: 0,
  setLengthCount: (lengthCount: number) => set({ lengthCount }),

  pieceSize: 0,
  setPieceSize: (pieceSize: number) => set({ pieceSize }),

  shapes: [],
  setShapes: (board: MultiGamePuzzlePiece[][]) => {
    const { shapes: prevShapes } = get();
    if (prevShapes.length > 0) {
      return;
    }
    const shapes = createShapes(board);
    set({ shapes });
  },

  bundles: [],
  setBundles: (bundles: Bundle[]) => set({ bundles }),

  reset: () => {
    set({
      widthCount: 0,
      lengthCount: 0,
      pieceSize: 0,
      shapes: [],
      bundles: [],
    });
  },
}));
