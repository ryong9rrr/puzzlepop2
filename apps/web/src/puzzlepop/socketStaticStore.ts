import { createStore } from "zustand/vanilla";
import * as Stomp from "@stomp/stompjs";
import { ChatMessage } from "@puzzlepop2/game-core";
import { isRecord } from "./typeUtils";

import {
  SEND_PUBLISH_DESTINATION,
  ORIGINAL_SERVER_END_POINT_WS,
  GAME_SUBSCRIBE_DESTINATION,
  CHAT_SUBSCRIBE_DESTINATION,
} from "@remotes-main/_ep";

interface SocketStaticStore {
  stomp: Stomp.Client | null;
  connect: (onConnect: Stomp.frameCallbackType) => void;
  send: (body: SendBody) => void;
  subscribe: <T extends "game" | "chat">(
    type: T,
    roomId: string,
    cb: (message: T extends "game" ? Record<string, unknown> : ChatMessage) => void,
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
      brokerURL: `${ORIGINAL_SERVER_END_POINT_WS()}/game`,
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
      destination: SEND_PUBLISH_DESTINATION,
      body: JSON.stringify(body),
    });
  },

  subscribe: <T extends "game" | "chat">(
    type: T,
    roomId: string,
    cb: (message: T extends "game" ? Record<string, unknown> : ChatMessage) => void,
  ) => {
    const { stomp } = get();
    if (!stomp) {
      throw new Error("Socket is not connected");
    }

    const destination =
      type === "game" ? GAME_SUBSCRIBE_DESTINATION(roomId) : CHAT_SUBSCRIBE_DESTINATION(roomId);

    stomp.subscribe(destination, message => {
      if (!message || !message.body) {
        console.error("메세지가 없다...", message);
        return;
      }

      const data = JSON.parse(message.body) as T extends "game"
        ? Record<string, unknown>
        : ChatMessage;

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

// 게임방 입장 메시지 전송
type EnterGame = {
  type: "ENTER";
  team: "RED" | "BLUE";
  roomId: string;
  sender: string;
};

// 채팅방 입장 및 메시지 전송
type SendChat = {
  type: "CHAT";
  roomId: string;
  sender: string;
  message: string;
};

// 그냥 게임방 정보 받아오기
type GetGameInfo = {
  type: "GAME";
  message: "GAME_INFO";
  roomId: string;
  sender: string;
};

type StartGame = {
  type: "GAME";
  message: "GAME_START";
  roomId: string;
  sender: string;
};

type MouseDrag = {
  type: "GAME";
  message: "MOUSE_DRAG";
  roomId: string;
  sender: string;
  targets: string; // nowIndex.toString() + "," + preIndex.toString() 형식
  position_x: number;
  position_y: number;
};

type SendBody = EnterGame | SendChat | GetGameInfo | StartGame | MouseDrag;
