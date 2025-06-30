import { Flex } from "@puzzlepop2/react-components-layout";
import { ChatHistoryProps, ChatInputProps } from "./types";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

export const Chat = (props: ChatHistoryProps & ChatInputProps) => {
  const { chats, onSubmit, color = "lavender", height = "25vh" } = props;

  return (
    <Flex direction="column" style={{ padding: "0.2rem" }}>
      <ChatHistory chats={chats} color={color} height={height} />
      <ChatInput onSubmit={onSubmit} color={color} />
    </Flex>
  );
};
