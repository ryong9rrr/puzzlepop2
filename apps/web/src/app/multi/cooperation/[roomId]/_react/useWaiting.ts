import { useState, useEffect, useMemo, useCallback } from "react";
import { ChatData, GameData, Player } from "@shared-types/multi";

import { socket } from "@remotes-main/socketStore";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { SystemChat, UserChat } from "./types";
import { useGameDataStore } from "./useGameDataStore";

interface Props {
  roomId: string;
  debugGameData?: (gameData: GameData) => void;
  debugChatData?: (chatData: ChatData) => void;
}

const { connect, disconnect, subscribe, send } = socket;

export const useWaiting = (props: Props) => {
  const { roomId, debugGameData, debugChatData } = props;

  const { gameData, setGameData } = useGameDataStore();
  const { chats, updateChat, updateChats, onSubmitChat } = useChat({ roomId });
  const { isCompleteConnectSocket, connectGameSocket, connectChatSocket } = useConnectSocketState();

  useEffect(() => {
    connect(() => {
      const me = getCooperationGameSessionStorage().getItem();
      const { updateLeaveChats } = playerManagerFromGameData();

      subscribe("game", roomId, gameData => {
        connectGameSocket();
        updateLeaveChats(gameData.redTeam.players, updateChats); // "[게임방을 나간 플레이어]님이 퇴장했어요." 채팅 메시지를 처리하는 로직
        setGameData(gameData);

        debugGameData?.(gameData);
      });

      subscribe("chat", roomId, chatData => {
        connectChatSocket();
        updateChat(chatData);

        debugChatData?.(chatData);
      });

      // 게임방 입장 메시지 전송
      send({
        type: "ENTER",
        roomId,
        sender: me.id,
        team: me.team,
      });

      // 채팅방 입장 메시지 전송
      send({
        type: "CHAT",
        roomId,
        sender: me.id,
        message: createSystemChatEnterMessage(me.id),
      });
    });

    return () => {
      disconnect();
    };
  }, []);

  return {
    isCompleteConnectSocket,
    gameData,
    chats,
    onSubmitChat,
  };
};

// ******** 채팅 상태 관리 훅 ********
const useChat = ({ roomId }: { roomId: string }) => {
  const [chats, setChats] = useState<(SystemChat | UserChat)[]>([]);

  const updateChat = (chatData: ChatData) => {
    const newChat = makeChat(chatData);
    setChats(prev => [...prev, newChat]);
  };

  const updateChats = (chatDataList: ChatData[]) => {
    const newChats = chatDataList.map(chatData => makeChat(chatData));
    setChats(prev => [...prev, ...newChats]);
  };

  const onSubmitChat = (message: string) => {
    const me = getCooperationGameSessionStorage().getItem();
    send({
      roomId,
      sender: me.id,
      type: "CHAT",
      message,
    });
  };

  return {
    chats,
    updateChat,
    updateChats,
    onSubmitChat,
  };
};

// ******** 채팅 메시지를 타입에 맞게 생성하는 유틸리티 함수들 ********
const SYSTEM_PREFIX = "[SYSTEM]";

const createSystemChatEnterMessage = (userId: string) => {
  return `${SYSTEM_PREFIX}${userId}님이 입장했어요.`;
};

const createSystemChatLeaveMessage = (userId: string) => {
  return `${SYSTEM_PREFIX}${userId}님이 퇴장했어요.`;
};

const makeChat = (chatData: ChatData) => {
  if (chatData.chatMessage.startsWith(SYSTEM_PREFIX)) {
    const systemMessage = chatData.chatMessage.replace(SYSTEM_PREFIX, "").trim();
    return {
      type: "system",
      message: systemMessage,
    } as SystemChat;
  }
  return {
    type: "chat",
    nickname: chatData.userid,
    message: chatData.chatMessage,
  } as UserChat;
};

// ******** 채팅방을 나간 플레이어를 관리하는 클로저 ********
// "[게임방을 나간 플레이어]님이 퇴장했어요." 채팅 메시지를 처리하는 로직
// 채팅을 나갔을 때 브로드캐스팅하는 백엔드 로직이 없어서 클라이언트에서 처리하기 위해 구현함.
const playerManagerFromGameData = () => {
  let prevPlayers: Player[] = [];
  const getLeftPlayer = (currentPlayers: Player[]) => {
    return prevPlayers.filter(prevPlayer => {
      const isExist = currentPlayers.find(
        currentPlayer => currentPlayer.sessionId === prevPlayer.sessionId,
      );
      return !isExist ? true : false;
    });
  };

  const createLeftChatData = (currentPlayers: Player[]) => {
    const leftPlayers = getLeftPlayer(currentPlayers);
    const nextChatDataList: ChatData[] = leftPlayers.map(leftPlayer => {
      return {
        userid: leftPlayer.id,
        teamColor: "RED",
        chatMessage: createSystemChatLeaveMessage(leftPlayer.id),
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

// ******** 소켓 연결 상태를 관리하는 훅 ********
const useConnectSocketState = () => {
  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const isCompleteConnectSocket = useMemo(() => {
    return isConnectedGameSocket && isConnectedChatSocket;
  }, [isConnectedChatSocket, isConnectedGameSocket]);

  const connectGameSocket = useCallback(() => {
    setIsConnectedGameSocket(true);
  }, []);

  const connectChatSocket = useCallback(() => {
    setIsConnectedChatSocket(true);
  }, []);

  return {
    isCompleteConnectSocket,
    connectGameSocket,
    connectChatSocket,
  };
};
