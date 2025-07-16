import { createStore } from "zustand/vanilla";
import { MultiGamePuzzlePiece, Shape } from "@puzzlepop2/game-core";

import { createShapes } from "./createShapes";

type InitParams = {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  board: MultiGamePuzzlePiece[][];
};

interface CanvasStore {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  shapes: Shape[];

  isInitialized: boolean;
  init: (params: InitParams) => void;

  reset: () => void;
}

export const canvasStore = createStore<CanvasStore>(set => ({
  widthCount: 0,
  lengthCount: 0,
  pieceSize: 0,
  shapes: [],

  isInitialized: false,
  init: params => {
    const { widthCount, lengthCount, pieceSize, board } = params;
    set({
      widthCount,
      lengthCount,
      pieceSize,
      shapes: createShapes({ board, widthCount, lengthCount }),
      isInitialized: true,
    });
  },

  reset: () => {
    set({
      widthCount: 0,
      lengthCount: 0,
      pieceSize: 0,
      isInitialized: false,
      shapes: [],
    });
  },
}));
