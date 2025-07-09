import { useState } from "react";
import { ChatData } from "@shared-types/multi";
import { socket } from "@remotes-main/socketStore";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { SystemChat, UserChat } from "./types";
import { makeChat } from "./utils";

const { send } = socket;

export const useChat = ({ roomId }: { roomId: string }) => {
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
    const user = getCooperationGameSessionStorage().getItem();
    send({
      roomId,
      sender: user.id,
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
