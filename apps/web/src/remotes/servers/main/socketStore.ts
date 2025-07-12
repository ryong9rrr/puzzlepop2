import * as Stomp from "@stomp/stompjs";
import { ChatData } from "@shared-types/multi";

import {
  SEND_PUBLISH_DESTINATION,
  CHAT_SUBSCRIBE_DESTINATION,
  GAME_SUBSCRIBE_DESTINATION,
} from "./_ep";

function createSocket() {
  let stomp: Stomp.Client | null = null;

  const connect = (onConnect: Stomp.frameCallbackType) => {
    if (stomp) {
      stomp.deactivate();
    }

    stomp = new Stomp.Client({
      brokerURL: `ws://localhost:9090/game`,
      onConnect,
      connectHeaders: {},
      reconnectDelay: 100,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.activate();
  };

  const send = (body: SendBody) => {
    if (!stomp) {
      return;
    }

    stomp.publish({
      destination: SEND_PUBLISH_DESTINATION,
      body: JSON.stringify(body),
    });
  };

  const subscribe = <T extends "game" | "chat">(
    type: T,
    roomId: string,
    cb: (message: T extends "game" ? unknown : ChatData) => void,
  ) => {
    if (!stomp) {
      return;
    }

    const destination =
      type === "game" ? GAME_SUBSCRIBE_DESTINATION(roomId) : CHAT_SUBSCRIBE_DESTINATION(roomId);

    stomp.subscribe(destination, message => {
      if (!message || !message.body) {
        console.warn("Received message without body:", message);
        return;
      }

      const data = JSON.parse(message.body) as T extends "game" ? unknown : ChatData;
      cb(data);
    });
  };

  const disconnect = () => {
    if (!stomp) {
      return;
    }
    stomp.deactivate();
  };

  return {
    stomp,
    send,
    connect,
    subscribe,
    disconnect,
  };
}

export const socket = createSocket();

// 게임방 입장 메시지 전송
type SendEnterGameBody = {
  type: "ENTER";
  team: "RED" | "BLUE";
  roomId: string;
  sender: string;
};

// 채팅방 입장 및 메시지 전송
type SendChatBody = {
  type: "CHAT";
  roomId: string;
  sender: string;
  message: string;
};

// 그냥 게임방 정보 받아오기
type SendGameInfoBody = {
  type: "GAME";
  message: "GAME_INFO";
  roomId: string;
  sender: string;
  targets?: string; // nowIndex.toString() + "," + preIndex.toString(),
};

type SendGameStartBody = {
  type: "GAME";
  message: "GAME_START";
  roomId: string;
  sender: string;
};

type SendBody = SendEnterGameBody | SendChatBody | SendGameInfoBody | SendGameStartBody;
