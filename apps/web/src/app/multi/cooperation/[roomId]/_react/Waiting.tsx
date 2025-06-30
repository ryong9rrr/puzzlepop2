"use client";

import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { Chat } from "@shared-components/Chats/Chat";

import { useConnectSocket } from "./useConnectSocket";

export const Waiting = ({ roomId }: { roomId: string }) => {
  const { isLoadingComplete, chats, onSubmitChat } = useConnectSocket({
    roomId,
    gameDataCallback: gameData => {
      console.log("Game Data Updated:", gameData);
    },
    chatDataCallback: chatData => {
      console.log("Chat Data Updated:", chatData);
    },
  });

  return (
    <>
      <LoadingOverlay isLoadingComplete={isLoadingComplete} />
      <Chat chats={chats} onSubmit={onSubmitChat} color="lavender" height="25vh" />
    </>
  );
};
