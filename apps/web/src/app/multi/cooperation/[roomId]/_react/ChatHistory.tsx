"use client";

import { useEffect, useRef } from "react";
import { Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { BACKGROUND_COLOR, BORDER_COLOR } from "./constants";
import { SystemChat, UserChat } from "./types";

const HEIGHT = "25vh";

interface Props {
  chats: (SystemChat | UserChat)[];
}

export default function ChatHistory(props: Props) {
  const { chats } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

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
        backgroundColor: BACKGROUND_COLOR,
        border: `2px solid ${BORDER_COLOR}`,
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
}
