import { createStore } from "zustand/vanilla";
import { Piece, PUZZLE_PIECE_SIZE_MAP, GameLevel } from "@puzzlepop2/game-core";

import * as GameServerSingleGameApi from "@remotes-single-game/singleGame/apis";

export type PaperPiece = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

interface GameStore {
  currentMaxGroupId: number;
  setCurrentMaxGroupId: (groupId: number) => void;

  level: GameLevel;
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

    const data = await GameServerSingleGameApi.fetchPuzzleData({ src, level });

    set({
      bundles: data.pieces,
      perColumn: data.perColumn,
      perRow: data.perRow,
      pieceSize: PUZZLE_PIECE_SIZE_MAP[level as GameLevel],
      level: level as GameLevel,
    });
  },

  pieces: [],
  setPieces: pieces => set({ pieces }),
}));

export const getGameStore = () => gameStore.getState();

const isValidGameLevel = (level: string) => {
  const gameLevels: GameLevel[] = ["easy", "normal", "hard"];
  return gameLevels.includes(level as GameLevel);
};
