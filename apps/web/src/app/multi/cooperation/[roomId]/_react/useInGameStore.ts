import { create } from "zustand";
import { MultiGameData } from "@puzzlepop2/game-core";

interface InGameStore {
  reset: () => void;

  time: number;
  setTime: (time: number) => void;

  imgSrc: string | null;
  setImgSrc: (imgSrc: string) => void;

  // TODO: 이건 필요없을지도 몰라...
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

  gameData: null,
  setGameData: (gameData: MultiGameData) => set({ gameData }),
}));
