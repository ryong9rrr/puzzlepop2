import { create } from "zustand";

interface SideWidgetStore {
  reset: () => void;

  isActiveTimer: boolean;
  toggleTimer: () => void;

  isActivePercent: boolean;
  togglePercent: () => void;

  isActiveExampleImage: boolean;
  toggleExampleImage: () => void;
}

export const useSideWidgetStore = create<SideWidgetStore>(set => ({
  reset: () =>
    set({
      isActiveTimer: true,
      isActivePercent: true,
      isActiveExampleImage: true,
    }),

  isActiveTimer: true,
  toggleTimer: () => set(state => ({ isActiveTimer: !state.isActiveTimer })),

  isActivePercent: true,
  togglePercent: () => set(state => ({ isActivePercent: !state.isActivePercent })),

  isActiveExampleImage: true,
  toggleExampleImage: () => set(state => ({ isActiveExampleImage: !state.isActiveExampleImage })),
}));
