import { useState } from "react";
import { ChatData, Player } from "@shared-types/multi";

import { SystemChatMessage, UserChatMessage } from "./types";

export const useChat = () => {
  const [chats, setChats] = useState<(SystemChatMessage | UserChatMessage)[]>([]);

  const updateChat = (chatData: ChatData) => {
    const newChat = makeChat(chatData);
    setChats(prev => [...prev, newChat]);
  };

  const updateChats = (chatDataList: ChatData[]) => {
    const newChats = chatDataList.map(makeChat);
    setChats(prev => [...prev, ...newChats]);
  };

  return {
    chats,
    updateChat,
    updateChats,
  };
};

// ******** 채팅 메시지를 타입에 맞게 생성하는 유틸리티 함수들 ********
export const createChatSystemMessage = (props: { userId: string; status: "ENTER" | "LEAVE" }) => {
  const { userId, status } = props;
  return `[SYSTEM] ${userId}님이 ${status === "ENTER" ? "입장" : "퇴장"}했어요.`;
};

const makeChat = (chatData: ChatData) => {
  if (chatData.chatMessage.startsWith("[SYSTEM]")) {
    return {
      type: "system",
      message: chatData.chatMessage.replace("[SYSTEM]", "").trim(),
    } as SystemChatMessage;
  }
  return {
    type: "chat",
    nickname: chatData.userid,
    message: chatData.chatMessage,
  } as UserChatMessage;
};

// ******** 채팅방을 나간 플레이어를 관리하는 클로저 ******** // "[게임방을 나간 플레이어]님이 퇴장했어요." 채팅 메시지를 처리하는 로직
// 채팅을 나갔을 때 브로드캐스팅하는 백엔드 로직이 없어서 클라이언트에서 처리하기 위해 구현함.
export const playerManagerFromGameData = () => {
  let prevPlayers: Player[] = [];

  const getLeftPlayer = (currentPlayers: Player[]) => {
    return prevPlayers.filter(prevPlayer => {
      const isExist = currentPlayers.find(
        currentPlayer => currentPlayer.sessionId === prevPlayer.sessionId,
      );
      if (!isExist) {
        return true;
      }
    });
  };

  const createLeftChatData = (currentPlayers: Player[]) => {
    const leftPlayers = getLeftPlayer(currentPlayers);

    const nextChatDataList: ChatData[] = leftPlayers.map(leftPlayer => {
      return {
        userid: leftPlayer.id,
        teamColor: "RED",
        chatMessage: createChatSystemMessage({
          userId: leftPlayer.id,
          status: "LEAVE",
        }),
        time: new Date().toISOString(),
      };
    });

    return nextChatDataList;
  };

  const updateLeaveChats = (
    newPlayer: Player[],
    setStateFn: (chatDataList: ChatData[]) => void,
  ) => {
    const 채팅방을_나간_플레이어가_발생했는가 =
      prevPlayers.length !== 0 && newPlayer.length !== prevPlayers.length;

    if (채팅방을_나간_플레이어가_발생했는가) {
      const nextChatDataList = createLeftChatData(newPlayer);
      setStateFn(nextChatDataList);
    }
    prevPlayers = newPlayer;
  };

  return {
    prevPlayers,
    getLeftPlayer,
    updateLeaveChats,
  };
};
