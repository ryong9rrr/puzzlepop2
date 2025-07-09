"use client";

import { useEffect, useMemo, useRef } from "react";
import { Text } from "@puzzlepop2/react-components-layout";
import { ColorLevel, vars } from "@puzzlepop2/themes";

import { ChatHistoryProps } from "./types";

export default function ChatHistory(props: Required<ChatHistoryProps>) {
  const { chats, color, height } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const backgroundColor = useMemo(() => {
    return getColor(color, 50);
  }, [color]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div
      ref={scrollRef}
      style={{
        margin: "0 1px",
        padding: "0.5rem",
        height,
        overflowY: "auto",
        backgroundColor,
        border: `2px solid ${getColor(color, 100)}`,
        borderRadius: "0.125rem",
        borderBottom: "none",
      }}
    >
      {chats.map((chat, index) => (
        <div key={index}>
          {chat.type === "system" ? (
            <Text bold size="xs" color={vars.colors.green[600]}>
              {chat.message}
            </Text>
          ) : (
            <Text size="xs">
              {chat.nickname}
              {chat.isMe && `(나)`} : {chat.message}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
}

const getColor = (color: keyof typeof vars.colors, level: ColorLevel) => {
  if (color === "white" || color === "black") {
    return color;
  }
  return vars.colors[color][level];
};
