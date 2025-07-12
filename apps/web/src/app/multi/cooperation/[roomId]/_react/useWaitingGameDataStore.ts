import { create } from "zustand";
import { CooperationWaitingGameData } from "@shared-types/multi";

interface WaitingGameDataStore {
  cooperationWaitingGameData: CooperationWaitingGameData | null;
  setCooperationWaitingGameData: (cooperationWaitingGameData: CooperationWaitingGameData) => void;
}

export const useWaitingGameDataStore = create<WaitingGameDataStore>((set, get) => ({
  cooperationWaitingGameData: null,
  setCooperationWaitingGameData: (cooperationWaitingGameData: CooperationWaitingGameData) => {
    set({ cooperationWaitingGameData });
  },
}));
