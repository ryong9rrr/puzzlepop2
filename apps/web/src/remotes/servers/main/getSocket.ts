import * as Stomp from "@stomp/stompjs";
import { ChatData, GameData } from "@shared-types/multi";

import {
  SEND_PUBLISH_DESTINATION,
  CHAT_SUBSCRIBE_DESTINATION,
  GAME_SUBSCRIBE_DESTINATION,
} from "./_ep";

type BaseSendBody = {
  roomId: string;
  sender: string;
};

// 게임 입장 send
type SendEnterGameRoomBody = {
  type: "ENTER";
  team: "RED" | "BLUE";
} & BaseSendBody;

// 채팅방 입장 send
type SendEnterChatRoomBody = {
  message: string;
  type: "CHAT";
} & BaseSendBody;

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
      // onStompError: frame => {
      //   console.error("Broker reported error: " + frame.headers["message"]);
      //   console.error("Additional details: " + frame.body);
      // },
      // debug: str => {
      //   console.log(`-------- [DEBUG] --------\n${str}`);
      // },
    });

    stomp.activate();
  };

  const send = (body: SendEnterGameRoomBody | SendEnterChatRoomBody) => {
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
    cb: (message: T extends "game" ? GameData : ChatData) => void,
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

      const data = JSON.parse(message.body) as T extends "game" ? GameData : ChatData;
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
    connect,
    send,
    subscribe,
    disconnect,
  };
}

export const socket = createSocket();
