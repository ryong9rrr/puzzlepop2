import * as Stomp from "@stomp/stompjs";
import { SendBody } from "./types/send";
import { SEND_PUBLISH } from "./end-points";

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
      onStompError: frame => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      debug: str => {
        console.log(`-------- [DEBUG] --------\n${str}`);
      },
    });

    stomp.activate();
    console.log("-------- [DEBUG] --------\n소켓연결시도");
  };

  const send = (body: SendBody) => {
    if (!stomp) {
      return;
    }

    stomp.publish({
      destination: SEND_PUBLISH,
      body: JSON.stringify(body),
    });
  };

  const subscribe = (destination: string, cb: Stomp.messageCallbackType) => {
    if (!stomp) {
      return;
    }

    stomp.subscribe(destination, cb);
  };

  const disconnect = () => {
    if (!stomp) {
      return;
    }

    stomp.deactivate();
    console.log("-------- [DEBUG] --------\n소켓연결해제");
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
