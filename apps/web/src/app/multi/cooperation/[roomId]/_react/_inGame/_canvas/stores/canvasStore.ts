import { createStore } from "zustand/vanilla";
import { MultiGamePuzzlePiece, Shape } from "@puzzlepop2/game-core";

type InitParams = {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  roomId: string;
  myNickname: string;
  board: MultiGamePuzzlePiece[][];
};

interface CanvasStore {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  shapes: Shape[];
  roomId: string;
  myNickname: string;

  isInitialized: boolean;
  init: (params: InitParams) => void;

  reset: () => void;
}

export const canvasStore = createStore<CanvasStore>(set => ({
  widthCount: 0,
  lengthCount: 0,
  pieceSize: 0,
  shapes: [],
  roomId: "",
  myNickname: "",

  isInitialized: false,
  init: params => {
    const { widthCount, lengthCount, pieceSize, roomId, myNickname, board } = params;
    set({
      widthCount,
      lengthCount,
      pieceSize,
      shapes: createShapes({ board, widthCount, lengthCount }),
      roomId,
      myNickname,
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

const createShapes = (params: {
  board: MultiGamePuzzlePiece[][];
  widthCount: number;
  lengthCount: number;
}): Shape[] => {
  const { board, widthCount, lengthCount } = params;

  const shapes: Shape[] = [];
  for (let y = 0; y < lengthCount; y += 1) {
    for (let x = 0; x < widthCount; x += 1) {
      const { type } = board[y][x];
      const [top, right, bottom, left] = type;
      shapes.push({
        top,
        right,
        bottom,
        left,
      });
    }
  }
  return shapes;
};
