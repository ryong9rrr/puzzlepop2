import { createStore } from "zustand/vanilla";
import { Shape } from "@puzzlepop2/game-core";
import { Me, Piece } from "../../types/base";

export type CanvasPiece = {
  groupId: number | null;
  index: number;
  paperGroup: paper.Group;
};

type InitData = {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  roomId: string;
  me: Me;
  level: number;

  shapes: Shape[];
};

type InitParams = {
  board: Piece[][];
} & Required<Omit<InitData, "shapes">>;

const getDefaultInitData = (): InitData => ({
  widthCount: 0,
  lengthCount: 0,
  pieceSize: 0,
  roomId: "",
  me: {
    id: new Date().getTime().toString(), // 임시 ID
    team: "RED",
  },
  level: 1,

  shapes: [],
});

interface CanvasStaticStore {
  isInitialized: boolean;
  initData: InitData;
  init: (params: InitParams) => void;

  redPieces: CanvasPiece[];
  setRedPieces: (redPieces: CanvasPiece[]) => void;
  redBundles: Piece[][];
  setRedBundles: (redBundles: Piece[][]) => void;

  bluePieces: CanvasPiece[];
  setBluePieces: (bluePieces: CanvasPiece[]) => void;
  blueBundles: Piece[][];
  setBlueBundles: (blueBundles: Piece[][]) => void;

  reset: () => void;
}

export const canvasStaticStore = createStore<CanvasStaticStore>((set, get) => ({
  isInitialized: false,
  initData: getDefaultInitData(),
  init: params => {
    const { isInitialized } = get();
    if (isInitialized) {
      return;
    }
    const { widthCount, lengthCount, pieceSize, roomId, board, me, level } = params;
    const shapes = createShapes({ board, widthCount, lengthCount });

    set({
      isInitialized: true,
      initData: {
        widthCount,
        lengthCount,
        pieceSize,
        roomId,
        shapes,
        me,
        level,
      },
    });
  },

  redPieces: [],
  setRedPieces: redPieces => set({ redPieces }),
  redBundles: [],
  setRedBundles: redBundles => set({ redBundles }),

  bluePieces: [],
  setBluePieces: bluePieces => set({ bluePieces }),
  blueBundles: [],
  setBlueBundles: blueBundles => set({ blueBundles }),

  reset: () => {
    set({
      isInitialized: false,
      initData: getDefaultInitData(),
      redPieces: [],
      bluePieces: [],
    });
  },
}));

const createShapes = (params: {
  board: Piece[][];
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
