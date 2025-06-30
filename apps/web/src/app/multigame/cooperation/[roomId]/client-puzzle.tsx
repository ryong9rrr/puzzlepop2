"use client";

import { useEffect } from "react";
import { PageProps } from "./types";

import { Flex } from "@puzzlepop2/react-components-layout";

import { ChatHistory, ChatInput } from "@/components/chats";
import { createSystemMessage, useChat } from "@/hooks/games/useChat";

import { useCooperationWaitingStore } from "@/stores/useCooperationWaitingStore";
import { getCooperationGameStorage } from "@/utils/storages";

import { MultiGameRoom } from "@/remotes/games/types";
import { socket } from "@/remotes/sockets/socket";
import { ChatData } from "@/remotes/sockets/types";
import { getGameDestination, getChatDestination } from "@/remotes/sockets/end-points";

const { connect, send, subscribe, disconnect } = socket;

export const ClientPuzzle = ({ roomId }: PageProps) => {
  const { setIsConnectedGameSocket, setIsConnectedChatSocket } = useCooperationWaitingStore();
  const { chats, updateChats } = useChat();

  const handleSubmitChat = (message: string) => {
    const user = getCooperationGameStorage().getItem();

    send({
      roomId,
      sender: user.id,
      type: "CHAT",
      message,
    });
  };

  useEffect(() => {
    const user = getCooperationGameStorage().getItem();

    connect(() => {
      // 게임방 구독
      subscribe(getGameDestination(roomId), message => {
        console.log("게임방 연결 완료");
        setIsConnectedGameSocket(true);
        const gameData = JSON.parse(message.body) as MultiGameRoom;
        console.log(gameData);
      });

      // 채팅방 구독
      subscribe(getChatDestination(roomId), message => {
        console.log("채팅방 연결 완료");
        setIsConnectedChatSocket(true);
        const chatData = JSON.parse(message.body) as ChatData;
        updateChats(chatData);
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
        message: createSystemMessage(user.id),
      });
    });

    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <h1>게임 방에 입장했어요 {roomId}</h1>

      <Flex direction="column" style={{ padding: "0.2rem" }}>
        <ChatHistory chatMessages={chats} />
        <ChatInput onSubmit={handleSubmitChat} />
      </Flex>
    </>
  );
};
