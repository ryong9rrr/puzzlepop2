import Paper from "paper";
import { createStore } from "zustand/vanilla";

import { Me, Piece, Shape, TeamColor } from "../types/base";
import * as Styles from "./renders/styles";

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

  redPieceLockMap: Record<number, string>; // redPieceLockMap[피드인덱스] : 락을 건 유저닉네임
  bluePieceLockMap: Record<number, string>; // bluePieceLockMap[피드인덱스] : 락을 건 유저닉네임
  isLock: (team: TeamColor, pieceIndex: number) => boolean;
  lock: (team: TeamColor, pieceIndexList: number[], userId: string) => void;
  unLock: (team: TeamColor, pieceIndexList: number[]) => void;

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

  redPieceLockMap: {},
  bluePieceLockMap: {},
  isLock: (team, pieceIndex) => {
    const {
      initData: { me },
      redPieceLockMap,
      bluePieceLockMap,
    } = get();
    const lockMap = team === "RED" ? redPieceLockMap : bluePieceLockMap;
    const lockingUser = lockMap[pieceIndex];
    if (lockingUser === undefined) {
      return false;
    }
    return lockingUser === me.id ? false : true;
  },
  lock: (team, pieceIndexList, userId) => {
    const { redPieces, bluePieces, redPieceLockMap, bluePieceLockMap } = get();
    const pieces = team === "RED" ? redPieces : bluePieces;
    const lockMap = team === "RED" ? redPieceLockMap : bluePieceLockMap;
    const pieceIndexSet = new Set(pieceIndexList);
    pieces.forEach(piece => {
      if (pieceIndexSet.has(piece.index)) {
        lockMap[piece.index] = userId;
        piece.paperGroup.strokeColor = new Paper.Color("red");
      }
    });
  },
  unLock: (team, pieceIndexList) => {
    const { redPieces, bluePieces, redPieceLockMap, bluePieceLockMap } = get();
    const pieces = team === "RED" ? redPieces : bluePieces;
    const lockMap = team === "RED" ? redPieceLockMap : bluePieceLockMap;
    const pieceIndexSet = new Set(pieceIndexList);
    pieces.forEach(piece => {
      if (pieceIndexSet.has(piece.index)) {
        delete lockMap[piece.index];
        piece.paperGroup.strokeColor = new Paper.Color(Styles.BORDER_STROKE_COLOR);
      }
    });
  },

  reset: () => {
    set({
      isInitialized: false,
      initData: getDefaultInitData(),
      redPieces: [],
      bluePieces: [],
      redPieceLockMap: {},
      bluePieceLockMap: {},
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
