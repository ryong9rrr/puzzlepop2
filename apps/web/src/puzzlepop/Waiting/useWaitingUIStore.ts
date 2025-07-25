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

const defaultImgSrc = null;
const defaultRoomTitle = "";
const defaultRoomSize = 0;
const defaultAdmin: Player | null = null;

export const useWaitingUIStore = create<WaitingUIStore>((set, get) => ({
  reset: () => {
    set({
      imgSrc: defaultImgSrc,
      roomTitle: defaultRoomTitle,
      roomSize: defaultRoomSize,
      admin: defaultAdmin,
      redPlayers: [],
      bluePlayers: [],
    });
  },

  imgSrc: defaultImgSrc,
  setImgSrc: src => set({ imgSrc: src }),

  roomTitle: defaultRoomTitle,
  setRoomTitle: roomTitle => set({ roomTitle }),

  roomSize: defaultRoomSize,
  setRoomSize: roomSize => set({ roomSize }),

  admin: defaultAdmin,
  setAdmin: admin => {
    const prevAdmin = get().admin;
    if (prevAdmin && prevAdmin.id === admin.id) {
      return;
    }
    set({ admin });
  },

  redPlayers: [],
  setRedPlayers: redPlayers => set({ redPlayers }),
  bluePlayers: [],
  setBluePlayers: bluePlayers => set({ bluePlayers }),
}));
