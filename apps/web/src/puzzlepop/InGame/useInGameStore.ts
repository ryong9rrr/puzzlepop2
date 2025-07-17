import { create } from "zustand";
import { MultiGamePuzzleType, MultiGamePlayerType } from "@puzzlepop2/game-core";

interface InGameStore {
  reset: () => void;

  isRenderComplete: boolean;
  setRenderComplete: (isRenderComplete: boolean) => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  redPuzzle: MultiGamePuzzleType | null;
  setRedPuzzle: (redPuzzle: MultiGamePuzzleType | null) => void;
  redPlayers: MultiGamePlayerType[];
  setRedPlayers: (redPlayers: MultiGamePlayerType[]) => void;

  bluePuzzle: MultiGamePuzzleType | null;
  setBluePuzzle: (bluePuzzle: MultiGamePuzzleType | null) => void;
  bluePlayers: MultiGamePlayerType[];
  setBluePlayers: (bluePlayers: MultiGamePlayerType[]) => void;
}

const defaultTime = 0;
const defaultImgSrc = null;

export const useInGameStore = create<InGameStore>((set, get) => ({
  reset: () => {
    set({
      isRenderComplete: false,

      time: defaultTime,
      imgSrc: defaultImgSrc,

      redPuzzle: null,
      redPlayers: [],
      bluePuzzle: null,
      bluePlayers: [],
    });
  },

  isRenderComplete: false,
  setRenderComplete: (isRenderComplete: boolean) => set({ isRenderComplete }),

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
  setRedPuzzle: (redPuzzle: MultiGamePuzzleType | null) => set({ redPuzzle }),
  redPlayers: [],
  setRedPlayers: (redPlayers: MultiGamePlayerType[]) => set({ redPlayers }),

  bluePuzzle: null,
  setBluePuzzle: (bluePuzzle: MultiGamePuzzleType | null) => set({ bluePuzzle }),
  bluePlayers: [],
  setBluePlayers: (bluePlayers: MultiGamePlayerType[]) => set({ bluePlayers }),
}));
