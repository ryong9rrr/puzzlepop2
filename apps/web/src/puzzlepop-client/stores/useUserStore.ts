import { create } from "zustand";

import { Me } from "../types/base";

interface UserStore {
  me: Me | null;
  setMe: (me: Me) => void;
}

export const useUserStore = create<UserStore>(set => ({
  me: null,
  setMe: me => set({ me }),
}));
