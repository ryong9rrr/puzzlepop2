import { create } from "zustand";
import { MultiGamePlayerType } from "@puzzlepop2/game-core";

interface WaitingStore {
  reset: () => void;

  imgSrc: string | null;
  setImgSrc: (src: string | null) => void;

  roomTitle: string;
  setRoomTitle: (roomTitle: string) => void;

  roomSize: number;
  setRoomSize: (roomSize: number) => void;

  admin: MultiGamePlayerType | null;
  setAdmin: (admin: MultiGamePlayerType) => void;

  redPlayers: MultiGamePlayerType[];
  setRedPlayers: (players: MultiGamePlayerType[]) => void;

  bluePlayers: MultiGamePlayerType[];
  setBluePlayers: (players: MultiGamePlayerType[]) => void;
}

const defaultImgSrc = null;
const defaultRoomTitle = "";
const defaultRoomSize = 0;
const defaultAdmin: MultiGamePlayerType | null = null;

export const useWaitingStore = create<WaitingStore>((set, get) => ({
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
