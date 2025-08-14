import { createStore } from "zustand/vanilla";

import { createPieces } from "./canvas/createPieces";

import { IMG_ID, PRACTICE_GAME_PUZZLE_PIECE_SIZE_MAP } from "./constants";
import { Piece, PracticeGameLevel } from "./types";

export type PaperPiece = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

interface GameStore {
  currentMaxGroupId: number;
  setCurrentMaxGroupId: (groupId: number) => void;

  level: PracticeGameLevel;
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
      pieceSize: PRACTICE_GAME_PUZZLE_PIECE_SIZE_MAP[level as PracticeGameLevel],
      level: level as PracticeGameLevel,
    });
  },

  pieces: [],
  setPieces: pieces => set({ pieces }),
}));

export const getGameStore = () => gameStore.getState();

const isValidGameLevel = (level: string): level is PracticeGameLevel => {
  const gameLevels: PracticeGameLevel[] = ["easy", "normal", "hard"];
  return gameLevels.includes(level as PracticeGameLevel);
};
