import { useEffect } from "react";

import { ChatData, GameData } from "@shared-types/multi";
import { useConnectSocketState } from "@shared-hooks/useConnectSocketState";
import {
  useChat,
  createChatSystemMessage,
  playerManagerFromGameData,
} from "@shared-components/Chats/useChat";

import { socket } from "@remotes-main/getSocket";
import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";

interface Props {
  roomId: string;
  gameDataCallback?: (gameData: GameData) => void;
  chatDataCallback?: (chatData: ChatData) => void;
}

const { connect, send, disconnect, subscribe } = socket;

export const useConnectSocket = (props: Props) => {
  const { roomId, gameDataCallback, chatDataCallback } = props;

  const { isLoadingComplete, connectGameSocket, connectChatSocket } = useConnectSocketState();
  const { chats, updateChat, updateChats } = useChat();

  const onSubmitChat = (message: string) => {
    const user = getCooperationGameSessionStorage().getItem();
    send({
      roomId,
      sender: user.id,
      type: "CHAT",
      message,
    });
  };

  useEffect(() => {
    connect(() => {
      const user = getCooperationGameSessionStorage().getItem();
      const { updateLeaveChats } = playerManagerFromGameData();

      subscribe("game", roomId, gameData => {
        connectGameSocket();
        updateLeaveChats(gameData.redTeam.players, updateChats, user.id); // "[게임방을 나간 플레이어]님이 퇴장했어요." 채팅 메시지를 처리하는 로직
        gameDataCallback?.(gameData);
      });

      subscribe("chat", roomId, chatData => {
        connectChatSocket();
        updateChat(chatData, user.id);
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
        message: createChatSystemMessage({
          userId: user.id,
          status: "ENTER",
        }),
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
