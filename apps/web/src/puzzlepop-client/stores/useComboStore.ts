import { create } from "zustand";
import { v4 as uuid } from "uuid";

type ComboState = {
  id: string;
  x: number;
  y: number;
  count: number;
  visible: boolean;
};

interface ComboStore {
  reset: () => void;

  combos: ComboState[];
  addCombo: (combo: Omit<ComboState, "id" | "visible">) => void;
}

export const useComboStore = create<ComboStore>(set => ({
  reset: () => {
    set({ combos: [] });
  },

  combos: [],

  addCombo: combo => {
    const id = uuid();
    set(state => ({
      combos: [...state.combos, { ...combo, id, visible: true }],
    }));

    setTimeout(() => {
      set(state => ({
        combos: state.combos.map(prevCombo =>
          prevCombo.id === id ? { ...prevCombo, visible: false } : prevCombo,
        ),
      }));

      setTimeout(() => {
        set(state => ({
          combos: state.combos.filter(prevCombo => prevCombo.id !== id),
        }));
      }, 700);
    }, 300);
  },
}));
