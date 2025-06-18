"use client";

import { useEffect, useMemo, useRef } from "react";
import { Text } from "@puzzlepop2/react-components-layout";
import { ColorLevel, vars } from "@puzzlepop2/themes";
import { SystemChatMessage, UserChatMessage, ChatProps } from "./types";

interface Props extends ChatProps {
  chatMessages: (SystemChatMessage | UserChatMessage)[];
}

export const ChatHistory = (props: Props) => {
  const { chatMessages, color = "lavender" } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const backgroundColor = useMemo(() => {
    return getColor(color, 50);
  }, [color]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      ref={scrollRef}
      style={{
        padding: "0.5rem",
        height: "25vh",
        overflowY: "auto",
        backgroundColor,
      }}
    >
      {chatMessages.map((chat, index) => (
        <div key={index}>
          {chat.type === "system" ? (
            <Text bold size="xs" color={vars.colors.green[600]}>
              {chat.message}
            </Text>
          ) : (
            <Text size="xs">
              {chat.nickname} : {chat.message}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
};

const getColor = (color: keyof typeof vars.colors, level: ColorLevel) => {
  if (color === "white" || color === "black") {
    return color;
  }
  return vars.colors[color][level];
};
