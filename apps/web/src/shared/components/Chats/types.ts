import { CSSProperties } from "react";
import { vars } from "@puzzlepop2/themes";

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

interface BaseChatProps {
  color?: keyof typeof vars.colors;
}

export interface ChatHistoryProps extends BaseChatProps {
  chats: (SystemChatMessage | UserChatMessage)[];
  height?: CSSProperties["height"];
}

export interface ChatInputProps extends BaseChatProps {
  onSubmit: (message: string) => void;
}
