import { create } from "zustand";
import { Player, Puzzle } from "../types/base";

interface InGameUIStore {
  reset: () => void;

  isRenderComplete: boolean;
  setRenderComplete: (isRenderComplete: boolean) => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  redPuzzle: Puzzle | null;
  setRedPuzzle: (redPuzzle: Puzzle | null) => void;
  redPlayers: Player[];
  setRedPlayers: (redPlayers: Player[]) => void;

  bluePuzzle: Puzzle | null;
  setBluePuzzle: (bluePuzzle: Puzzle | null) => void;
  bluePlayers: Player[];
  setBluePlayers: (bluePlayers: Player[]) => void;
}

const defaultTime = 0;
const defaultImgSrc = null;

export const useInGameUIStore = create<InGameUIStore>((set, get) => ({
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
  setRedPuzzle: (redPuzzle: Puzzle | null) => set({ redPuzzle }),
  redPlayers: [],
  setRedPlayers: (redPlayers: Player[]) => set({ redPlayers }),

  bluePuzzle: null,
  setBluePuzzle: (bluePuzzle: Puzzle | null) => set({ bluePuzzle }),
  bluePlayers: [],
  setBluePlayers: (bluePlayers: Player[]) => set({ bluePlayers }),
}));
