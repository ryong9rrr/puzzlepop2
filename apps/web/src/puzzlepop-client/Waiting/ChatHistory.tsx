"use client";

import { useEffect, useRef } from "react";
import { Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { useChatStore } from "../useChatStore";

const HEIGHT = "25vh";

export const ChatHistory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats = useChatStore(state => state.chats);

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
        height: HEIGHT,
        overflowY: "auto",
        backgroundColor: vars.colors.grey[50],
        border: `2px solid ${vars.colors.grey[300]}`,
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
              {chat.nickname} : {chat.message}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
};
