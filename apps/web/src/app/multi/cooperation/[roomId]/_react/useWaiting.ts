import { useEffect } from "react";
import { ChatData, GameData } from "@shared-types/multi";
import { useConnectSocketState } from "@shared-hooks/useConnectSocketState";

import { socket } from "@remotes-main/socketStore";
import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { createSystemChatEnterMessage, playerManagerFromGameData } from "./utils";
import { useChat } from "./useChat";

interface Props {
  roomId: string;
  gameDataCallback?: (gameData: GameData) => void;
  chatDataCallback?: (chatData: ChatData) => void;
}

const { connect, send, disconnect, subscribe } = socket;

export const useWaiting = (props: Props) => {
  const { roomId, gameDataCallback, chatDataCallback } = props;

  const { isLoadingComplete, connectGameSocket, connectChatSocket } = useConnectSocketState();
  const { chats, updateChat, updateChats, onSubmitChat } = useChat({ roomId });

  useEffect(() => {
    connect(() => {
      const user = getCooperationGameSessionStorage().getItem();
      const { updateLeaveChats } = playerManagerFromGameData();

      subscribe("game", roomId, gameData => {
        connectGameSocket();
        updateLeaveChats(gameData.redTeam.players, updateChats); // "[게임방을 나간 플레이어]님이 퇴장했어요." 채팅 메시지를 처리하는 로직
        gameDataCallback?.(gameData);
      });

      subscribe("chat", roomId, chatData => {
        connectChatSocket();
        updateChat(chatData);
        chatDataCallback?.(chatData);
      });

      // 게임방 입장 메시지 전송
      send({
        roomId,
        sender: user.id,
        type: "ENTER",
        team: user.team,
      });

      // 채팅방 입장 메시지 전송
      send({
        roomId,
        sender: user.id,
        type: "CHAT",
        message: createSystemChatEnterMessage(user.id),
      });
    });

    return () => {
      disconnect();
    };
  }, []);

  return {
    isLoadingComplete,
    chats,
    onSubmitChat,
  };
};
