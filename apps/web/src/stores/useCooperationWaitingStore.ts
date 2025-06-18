import { create } from "zustand";

interface CooperationWaitingStore {
  isConnectedGameSocket: boolean;
  setIsConnectedGameSocket: (isConnected: boolean) => void;

  isConnectedChatSocket: boolean;
  setIsConnectedChatSocket: (isConnected: boolean) => void;
}

export const useCooperationWaitingStore = create<CooperationWaitingStore>(set => ({
  isConnectedGameSocket: false,
  setIsConnectedGameSocket: isConnected => set({ isConnectedGameSocket: isConnected }),
  isConnectedChatSocket: false,
  setIsConnectedChatSocket: isConnected => set({ isConnectedChatSocket: isConnected }),
}));
