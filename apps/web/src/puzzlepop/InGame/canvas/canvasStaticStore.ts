import { createStore } from "zustand/vanilla";
import { Point } from "paper/dist/paper-core";
import {
  MeFromStorage,
  MultiGameMouseDragMessage,
  MultiGamePieceType,
  MultiGameTeamType,
  Shape,
} from "@puzzlepop2/game-core";

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
  myNickname: string;
  shapes: Shape[];
  me: MeFromStorage;
};

const getDefaultInitData = (): InitData => ({
  widthCount: 0,
  lengthCount: 0,
  pieceSize: 0,
  roomId: "",
  myNickname: "",
  shapes: [],
  me: {
    id: new Date().getTime().toString(), // 임시 ID
    team: "RED",
  },
});

type InitParams = {
  board: MultiGamePieceType[][];
} & Required<Omit<InitData, "shapes">>;

interface CanvasStaticStore {
  isInitialized: boolean;
  initData: InitData;
  init: (params: InitParams) => void;

  redPieces: CanvasPiece[];
  setRedPieces: (redPieces: CanvasPiece[]) => void;

  bluePieces: CanvasPiece[];
  setBluePieces: (bluePieces: CanvasPiece[]) => void;

  reset: () => void;
  syncMouseDragEvent: (gameData: MultiGameMouseDragMessage, team: MultiGameTeamType) => void;
}

export const canvasStaticStore = createStore<CanvasStaticStore>((set, get) => ({
  isInitialized: false,
  initData: getDefaultInitData(),
  init: params => {
    const { isInitialized } = get();
    if (isInitialized) {
      return;
    }
    const { widthCount, lengthCount, pieceSize, roomId, myNickname, board, me } = params;
    const shapes = createShapes({ board, widthCount, lengthCount });
    set({
      isInitialized: true,
      initData: {
        widthCount,
        lengthCount,
        pieceSize,
        roomId,
        myNickname,
        shapes,
        me,
      },
    });
  },

  redPieces: [],
  setRedPieces: redPieces => set({ redPieces }),

  bluePieces: [],
  setBluePieces: bluePieces => set({ bluePieces }),

  reset: () => {
    set({
      isInitialized: false,
      initData: getDefaultInitData(),
      redPieces: [],
      bluePieces: [],
    });
  },

  syncMouseDragEvent: gameData => {
    const { me } = get().initData;
    const { targets, senderId, team } = gameData as MultiGameMouseDragMessage;

    if (me.id === senderId || me.team !== team) {
      return;
    }

    const { redPieces, bluePieces } = get();
    const pieces = team === "RED" ? redPieces : bluePieces;
    const groupedPieces = JSON.parse(targets) as {
      x: number;
      y: number;
      index: number;
    }[];
    groupedPieces.forEach(({ x, y, index }) => {
      pieces[index].paperGroup.position = new Point(x, y);
    });
  },
}));

const createShapes = (params: {
  board: MultiGamePieceType[][];
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
