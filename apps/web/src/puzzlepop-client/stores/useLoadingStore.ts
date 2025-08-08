import { create } from "zustand";

interface LoadingStore {
  reset: () => void;

  isSetupCompleteCanvas: boolean;
  setIsSetupCompleteCanvas: (value: boolean) => void;

  isConnectCompleteGameSocket: boolean;
  setIsConnectCompleteGameSocket: (value: boolean) => void;

  isConnectCompleteChatSocket: boolean;
  setIsConnectCompleteChatSocket: (value: boolean) => void;
}

const getDefaultState = () => {
  return {
    isSetupCompleteCanvas: false,
    isConnectCompleteGameSocket: false,
    isConnectCompleteChatSocket: false,
  };
};

export const useLoadingStore = create<LoadingStore>(set => ({
  reset: () => {
    set(getDefaultState());
  },

  isSetupCompleteCanvas: getDefaultState().isSetupCompleteCanvas,
  setIsSetupCompleteCanvas: value => {
    set({ isSetupCompleteCanvas: value });
  },

  isConnectCompleteGameSocket: getDefaultState().isConnectCompleteGameSocket,
  setIsConnectCompleteGameSocket: value => {
    set({ isConnectCompleteGameSocket: value });
  },

  isConnectCompleteChatSocket: getDefaultState().isConnectCompleteChatSocket,
  setIsConnectCompleteChatSocket: value => {
    set({ isConnectCompleteChatSocket: value });
  },
}));
