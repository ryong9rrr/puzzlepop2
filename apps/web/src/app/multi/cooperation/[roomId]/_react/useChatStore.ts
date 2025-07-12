import { socket } from "@remotes-main/socketStore";
import { ChatData, Player } from "@shared-types/multi";
import { create } from "zustand";

const SYSTEM_PREFIX = "[__SYSTEM__]";

interface ChatStore {
  chats: (SystemChat | UserChat)[];
  sendSystemMessage: (props: { roomId: string; message: string }) => void;
  clearChat: () => void;
  addChat: (chatData: ChatData) => void;
  leaveChat: ({
    prevPlayers,
    currentPlayers,
  }: {
    prevPlayers: Player[];
    currentPlayers: Player[];
  }) => void;
}

const { send } = socket;

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  sendSystemMessage: ({ roomId, message }) => {
    send({
      type: "CHAT",
      roomId,
      sender: "",
      message: `${SYSTEM_PREFIX}${message}`,
    });
  },
  clearChat: () => set({ chats: [] }),
  addChat: chatData => {
    const { chats } = get();
    const newChat = makeChat(chatData);
    set({ chats: [...chats, newChat] });
  },
  leaveChat: ({
    prevPlayers,
    currentPlayers,
  }: {
    prevPlayers: Player[];
    currentPlayers: Player[];
  }) => {
    const 채팅방을_나간_플레이어가_발생했는가 =
      prevPlayers.length !== 0 && currentPlayers.length !== prevPlayers.length;

    if (!채팅방을_나간_플레이어가_발생했는가) {
      return;
    }

    const leftPlayers = prevPlayers.filter(prevPlayer => {
      return !currentPlayers.find(
        currentPlayer => currentPlayer.sessionId === prevPlayer.sessionId,
      );
    });

    const nextChatDataList: ChatData[] = leftPlayers.map(leftPlayer => {
      return {
        userid: leftPlayer.id,
        teamColor: "RED",
        chatMessage: `${SYSTEM_PREFIX}${leftPlayer.id}님이 퇴장했어요.`,
        time: new Date().toISOString(),
      };
    });

    const newChats = nextChatDataList.map(makeChat);
    const { chats } = get();
    set({ chats: [...chats, ...newChats] });
  },
}));

type SystemChat = {
  type: "system";
  message: string;
};

type UserChat = {
  type: "chat";
  nickname: string;
  message: string;
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
