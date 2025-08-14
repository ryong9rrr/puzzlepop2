import { createStore } from "zustand/vanilla";
import * as Stomp from "@stomp/stompjs";

import {
  getSendPublishDestination,
  getWebSocketEndPoint,
  getGameSubscribeDestination,
  getChatSubscribeDestination,
} from "@remotes-main/endPoints";

import { isRecord } from "./socketMessageMatchers";
import { ChatData } from "./types/chat";
import { SendBody } from "./types/sendBody";

interface SocketStaticStore {
  stomp: Stomp.Client | null;
  connect: (onConnect: Stomp.frameCallbackType) => void;
  send: (body: SendBody) => void;
  subscribe: <T extends "game" | "chat">(
    type: T,
    roomId: string,
    cb: (message: T extends "game" ? Record<string, unknown> : ChatData) => void,
  ) => void;
  disconnect: () => void;
}

export const socketStaticStore = createStore<SocketStaticStore>((set, get) => ({
  stomp: null,

  connect: onConnect => {
    const { stomp: prevStomp } = get();
    if (prevStomp) {
      prevStomp.deactivate();
    }

    const stomp = new Stomp.Client({
      brokerURL: `${getWebSocketEndPoint()}/game`,
      onConnect,
      connectHeaders: {},
      reconnectDelay: 100,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.activate();
    set({ stomp });
  },

  send: body => {
    const { stomp } = get();
    if (!stomp) {
      throw new Error("Socket is not connected");
    }

    stomp.publish({
      destination: getSendPublishDestination,
      body: JSON.stringify(body),
    });
  },

  subscribe: <T extends "game" | "chat">(
    type: T,
    roomId: string,
    cb: (message: T extends "game" ? Record<string, unknown> : ChatData) => void,
  ) => {
    const { stomp } = get();
    if (!stomp) {
      throw new Error("Socket is not connected");
    }

    const destination =
      type === "game" ? getGameSubscribeDestination(roomId) : getChatSubscribeDestination(roomId);

    stomp.subscribe(destination, message => {
      if (!message || !message.body) {
        console.error("메세지가 없다...", message);
        return;
      }

      const data = JSON.parse(message.body) as T extends "game"
        ? Record<string, unknown>
        : ChatData;

      if (!isRecord(data)) {
        console.error("기대되지 않은 데이터를 받았다...", data);
        return;
      }

      cb(data);
    });
  },

  disconnect: () => {
    const { stomp } = get();
    if (!stomp) {
      throw new Error("Socket is not connected");
    }

    stomp.deactivate();
    set({ stomp: null });
  },
}));
