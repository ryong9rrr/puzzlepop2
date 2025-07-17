import { create } from "zustand";
import { MultiGamePuzzleType, MultiGamePlayerType } from "@puzzlepop2/game-core";

interface InGameStore {
  reset: () => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  redPuzzle: MultiGamePuzzleType | null;
  setRedPuzzle: (puzzle: MultiGamePuzzleType | null) => void;
  redPlayers: MultiGamePlayerType[];
  setRedPlayers: (players: MultiGamePlayerType[]) => void;

  bluePuzzle: MultiGamePuzzleType | null;
  setBluePuzzle: (puzzle: MultiGamePuzzleType | null) => void;
  bluePlayers: MultiGamePlayerType[];
  setBluePlayers: (players: MultiGamePlayerType[]) => void;
}

const defaultTime = 0;
const defaultImgSrc = null;

export const useInGameStore = create<InGameStore>((set, get) => ({
  reset: () => {
    set({
      time: defaultTime,
      imgSrc: defaultImgSrc,

      redPuzzle: null,
      redPlayers: [],
      bluePuzzle: null,
      bluePlayers: [],
    });
  },

  time: defaultTime,
  setTime: (time: number) => set({ time }),

  imgSrc: defaultImgSrc,
  setImgSrc: (imgSrc: string) => {
    const prev = get().imgSrc;
    if (!prev) {
      set({ imgSrc });
    }
  },

  redPuzzle: null,
  setRedPuzzle: (puzzle: MultiGamePuzzleType | null) => set({ redPuzzle: puzzle }),
  redPlayers: [],
  setRedPlayers: (players: MultiGamePlayerType[]) => set({ redPlayers: players }),

  bluePuzzle: null,
  setBluePuzzle: (puzzle: MultiGamePuzzleType | null) => set({ bluePuzzle: puzzle }),
  bluePlayers: [],
  setBluePlayers: (players: MultiGamePlayerType[]) => set({ bluePlayers: players }),
}));
