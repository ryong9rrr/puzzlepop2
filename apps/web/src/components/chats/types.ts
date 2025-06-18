import { vars } from "@puzzlepop2/themes";

type ChatType = "chat" | "system";

type BaseChatMessage = {
  message: string;
};

export type SystemChatMessage = BaseChatMessage & {
  type: "system";
};

export type UserChatMessage = BaseChatMessage & {
  nickname: string;
  type?: "chat";
};

export type ChatMessage = SystemChatMessage | UserChatMessage;

export type ChatMessageType<T extends ChatType> = T extends "system"
  ? SystemChatMessage
  : UserChatMessage;

export type ChatProps = {
  color?: keyof typeof vars.colors;
};
