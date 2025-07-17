import { create } from "zustand";
import { Player, Puzzle } from "../types/base";

interface InGameStore {
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
  redComboCount: number;
  setRedComboCount: (redComboCount: number) => void;

  bluePuzzle: Puzzle | null;
  setBluePuzzle: (bluePuzzle: Puzzle | null) => void;
  bluePlayers: Player[];
  setBluePlayers: (bluePlayers: Player[]) => void;
  blueComboCount: number;
  setBlueComboCount: (blueComboCount: number) => void;
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
  setRedPuzzle: (redPuzzle: Puzzle | null) => set({ redPuzzle }),
  redPlayers: [],
  setRedPlayers: (redPlayers: Player[]) => set({ redPlayers }),
  redComboCount: 0,
  setRedComboCount: (redComboCount: number) => set({ redComboCount }),

  bluePuzzle: null,
  setBluePuzzle: (bluePuzzle: Puzzle | null) => set({ bluePuzzle }),
  bluePlayers: [],
  setBluePlayers: (bluePlayers: Player[]) => set({ bluePlayers }),
  blueComboCount: 0,
  setBlueComboCount: (blueComboCount: number) => set({ blueComboCount: 0 }),
}));
