import { Player } from "@shared-types/multi";
import { create } from "zustand";

interface WaitingStore {
  imgSrc: string | null;
  setImgSrc: (src: string | null) => void;

  roomTitle: string;
  setRoomTitle: (roomTitle: string) => void;

  roomSize: number;
  setRoomSize: (roomSize: number) => void;

  admin: Player | null;
  setAdmin: (admin: Player) => void;

  players: Player[];
  setPlayers: (players: Player[]) => void;
}

export const useWaitingStore = create<WaitingStore>((set, get) => ({
  imgSrc: null,
  setImgSrc: src => set({ imgSrc: src }),

  roomTitle: "",
  setRoomTitle: roomTitle => set({ roomTitle }),

  roomSize: 0,
  setRoomSize: roomSize => set({ roomSize }),

  admin: null,
  setAdmin: admin => {
    const prevAdmin = get().admin;
    if (prevAdmin && prevAdmin.id === admin.id) {
      return;
    }
    set({ admin });
  },

  players: [],
  setPlayers: players => set({ players }),
}));
