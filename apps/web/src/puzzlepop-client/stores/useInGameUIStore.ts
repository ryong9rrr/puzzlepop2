import { create } from "zustand";
import { Player, Puzzle } from "../types/base";

interface InGameUIStore {
  reset: () => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;

  redPuzzle: Puzzle | null;
  setRedPuzzle: (redPuzzle: Puzzle | null) => void;
  redPlayers: Player[];
  setRedPlayers: (redPlayers: Player[]) => void;
  redPercentage: number;
  setRedPercentage: (redPercentage: number) => void;

  bluePuzzle: Puzzle | null;
  setBluePuzzle: (bluePuzzle: Puzzle | null) => void;
  bluePlayers: Player[];
  setBluePlayers: (bluePlayers: Player[]) => void;
  bluePercentage: number;
  setBluePercentage: (bluePercentage: number) => void;
}

const getDefaultValues = () => {
  return {
    time: 0,
    imgSrc: null,
    isFinished: false,

    redPuzzle: null,
    redPlayers: [],
    redPercentage: 0,

    bluePuzzle: null,
    bluePlayers: [],
    bluePercentage: 0,
  };
};

export const useInGameUIStore = create<InGameUIStore>((set, get) => ({
  reset: () => {
    const defaultValues = getDefaultValues();
    set({ ...defaultValues });
  },

  time: getDefaultValues().time,
  setTime: (time: number) => set({ time }),

  imgSrc: getDefaultValues().imgSrc,
  setImgSrc: (imgSrc: string) => {
    const prev = get().imgSrc;
    if (!prev) {
      set({ imgSrc });
    }
  },

  isFinished: getDefaultValues().isFinished,
  setIsFinished: (isFinished: boolean) => set({ isFinished }),

  redPuzzle: getDefaultValues().redPuzzle,
  setRedPuzzle: (redPuzzle: Puzzle | null) => set({ redPuzzle }),
  redPlayers: getDefaultValues().redPlayers,
  setRedPlayers: (redPlayers: Player[]) => set({ redPlayers }),
  redPercentage: getDefaultValues().redPercentage,
  setRedPercentage: (redPercentage: number) => set({ redPercentage }),

  bluePuzzle: getDefaultValues().bluePuzzle,
  setBluePuzzle: (bluePuzzle: Puzzle | null) => set({ bluePuzzle }),
  bluePlayers: getDefaultValues().bluePlayers,
  setBluePlayers: (bluePlayers: Player[]) => set({ bluePlayers }),
  bluePercentage: getDefaultValues().bluePercentage,
  setBluePercentage: (bluePercentage: number) => set({ bluePercentage }),
}));
