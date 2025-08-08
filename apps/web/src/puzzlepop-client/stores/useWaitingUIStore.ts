import { create } from "zustand";
import { Player } from "../types/base";

interface WaitingUIStore {
  reset: () => void;

  imgSrc: string | null;
  setImgSrc: (src: string | null) => void;

  roomTitle: string;
  setRoomTitle: (roomTitle: string) => void;

  roomSize: number;
  setRoomSize: (roomSize: number) => void;

  admin: Player | null;
  setAdmin: (admin: Player) => void;

  redPlayers: Player[];
  setRedPlayers: (players: Player[]) => void;

  bluePlayers: Player[];
  setBluePlayers: (players: Player[]) => void;
}

const getDefaultValues = () => {
  return {
    imgSrc: null,
    roomTitle: "",
    roomSize: 0,
    admin: null,
    redPlayers: [],
    bluePlayers: [],
  };
};

export const useWaitingUIStore = create<WaitingUIStore>((set, get) => ({
  reset: () => {
    const defaultValues = getDefaultValues();
    set({ ...defaultValues });
  },

  imgSrc: getDefaultValues().imgSrc,
  setImgSrc: src => set({ imgSrc: src }),

  roomTitle: getDefaultValues().roomTitle,
  setRoomTitle: roomTitle => set({ roomTitle }),

  roomSize: getDefaultValues().roomSize,
  setRoomSize: roomSize => set({ roomSize }),

  admin: getDefaultValues().admin,
  setAdmin: admin => {
    const prevAdmin = get().admin;
    if (prevAdmin && prevAdmin.id === admin.id) {
      return;
    }
    set({ admin });
  },

  redPlayers: getDefaultValues().redPlayers,
  setRedPlayers: redPlayers => set({ redPlayers }),

  bluePlayers: getDefaultValues().bluePlayers,
  setBluePlayers: bluePlayers => set({ bluePlayers }),
}));
