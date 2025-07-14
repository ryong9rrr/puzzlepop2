import { create } from "zustand";
import { MultiGameData } from "@puzzlepop2/game-core";

interface InGameStore {
  reset: () => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  pieceSize: number;
  setPieceSize: (pieceSize: number) => void;

  widthCount: number;
  setWidthCount: (widthCount: number) => void;

  lengthCount: number;
  setLengthCount: (lengthCount: number) => void;

  gameData: MultiGameData | null;
  setGameData: (gameData: MultiGameData) => void;
}

const defaultTime = 0;
const defaultImgSrc = null;

export const useInGameStore = create<InGameStore>((set, get) => ({
  reset: () => {
    set({
      time: defaultTime,
      imgSrc: defaultImgSrc,
      gameData: null,
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

  pieceSize: 0,
  setPieceSize: (pieceSize: number) => set({ pieceSize }),

  widthCount: 0,
  setWidthCount: (widthCount: number) => set({ widthCount }),

  lengthCount: 0,
  setLengthCount: (lengthCount: number) => set({ lengthCount }),

  gameData: null,
  setGameData: (gameData: MultiGameData) => set({ gameData }),
}));
