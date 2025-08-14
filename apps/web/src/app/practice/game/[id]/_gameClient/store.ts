import { createStore } from "zustand/vanilla";
import {
  IMG_ID,
  Piece,
  SINGLE_GAME_PUZZLE_PIECE_SIZE_MAP,
  SingleGameLevelType,
} from "@puzzlepop2/game-core";
import { createPieces } from "./canvas/createPieces";

export type PaperPiece = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

interface GameStore {
  currentMaxGroupId: number;
  setCurrentMaxGroupId: (groupId: number) => void;

  level: SingleGameLevelType;
  pieceSize: number;
  perColumn: number;
  perRow: number;
  bundles: Piece[];
  fetchPuzzleData: (props: { src: string; level: string }) => Promise<void>;

  pieces: PaperPiece[];
  setPieces: (pieces: PaperPiece[]) => void;
}

const gameStore = createStore<GameStore>(set => ({
  currentMaxGroupId: 0,
  setCurrentMaxGroupId: groupId => set({ currentMaxGroupId: groupId }),

  level: "easy",
  pieceSize: 0,
  perColumn: 0,
  perRow: 0,
  bundles: [],

  fetchPuzzleData: async props => {
    const { src, level } = props;

    if (!isValidGameLevel(level)) {
      return Promise.reject(new Error("Invalid game level"));
    }

    const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
    const width = imgElement.naturalWidth;
    const height = imgElement.naturalHeight;

    const data = createPieces({
      gameLevel: level,
      imgWidth: width,
      imgHeight: height,
      options: {
        position: "random",
      },
    });

    set({
      bundles: data.pieces,
      perColumn: data.perColumn,
      perRow: data.perRow,
      pieceSize: SINGLE_GAME_PUZZLE_PIECE_SIZE_MAP[level as SingleGameLevelType],
      level: level as SingleGameLevelType,
    });
  },

  pieces: [],
  setPieces: pieces => set({ pieces }),
}));

export const getGameStore = () => gameStore.getState();

const isValidGameLevel = (level: string): level is SingleGameLevelType => {
  const gameLevels: SingleGameLevelType[] = ["easy", "normal", "hard"];
  return gameLevels.includes(level as SingleGameLevelType);
};
