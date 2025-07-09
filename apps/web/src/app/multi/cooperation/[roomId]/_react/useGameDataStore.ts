import { GameData } from "@shared-types/multi";
import { create } from "zustand";

interface GameDataStore {
  gameData: null | GameData;
  setGameData: (gameData: GameData) => void;
}

export const useGameDataStore = create<GameDataStore>((set, get) => ({
  gameData: null,
  setGameData: (gameData: GameData) => set({ gameData }),
}));
