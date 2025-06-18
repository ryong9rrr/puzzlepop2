import { useState } from "react";
import { ChatMessage, ChatMessageType } from "@/components/chats";
import { ChatData } from "@/remotes/sockets/types";

export const useChat = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);

  const updateChats = (chatData: ChatData) => {
    if (isSystemMessage(chatData.chatMessage)) {
      setChats(prev => [
        ...prev,
        {
          type: "system",
          message: chatData.chatMessage.replace("[SYSTEM]", "").trim(),
        } as ChatMessageType<"system">,
      ]);
      return;
    }

    setChats(prev => [
      ...prev,
      {
        type: "chat",
        nickname: chatData.userid,
        message: chatData.chatMessage,
      } as ChatMessageType<"chat">,
    ]);
  };

  return {
    chats,
    updateChats,
  };
};

export const createSystemMessage = (userId: string) => {
  return `[SYSTEM] ${userId}님이 입장했어요.`;
};

const isSystemMessage = (chatData: string) => {
  return chatData.startsWith("[SYSTEM]");
};
