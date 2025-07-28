import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@puzzlepop2/react-components-button";
import { vars } from "@puzzlepop2/themes";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

import { ChatInput } from "../ChatInput";
import { useChatStore } from "../useChatStore";
import styles from "./ChatWidget.module.css";

export const ChatWidget = ({ roomId }: { roomId: string }) => {
  const [isShowAlarm, setIsShowAlarm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const chats = useChatStore(state => state.chats);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsShowAlarm(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsShowAlarm(false);
  };

  // ESC로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsShowAlarm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // chats 상태가 바뀌면 알람 true
  useEffect(() => {
    setIsShowAlarm(true);
  }, [chats]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "4px",
        right: "8px",
        zIndex: 999,
      }}
    >
      <ChatIcon isShowAlarm={isShowAlarm} handleOpenChat={handleOpenChat} />
      {isOpen && <ChatSlide roomId={roomId} handleCloseChat={handleCloseChat} />}
    </div>
  );
};

const ChatIcon = ({
  isShowAlarm,
  handleOpenChat,
}: {
  isShowAlarm: boolean;
  handleOpenChat: () => void;
}) => {
  return (
    <div
      className={styles["hover-grow"]}
      style={{
        position: "relative",
      }}
    >
      {isShowAlarm && (
        <DotLottieReact
          src="/lotties/chat-alarm.lottie"
          autoplay
          loop
          speed={1}
          style={{
            position: "absolute",
            bottom: "51px",
            right: "-3px",
            width: "88px",
            height: "88px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      <Image
        className={isShowAlarm ? "animate__animated animate__swing animate__repeat-3" : ""}
        src="/group-chat.webp"
        alt="chatIcon"
        width={60}
        height={60}
        onClick={handleOpenChat}
        style={{
          padding: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: `3px solid ${vars.colors.grey[500]}`,
          borderRadius: "8px",
          cursor: "pointer",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const ChatSlide = ({
  roomId,
  handleCloseChat,
}: {
  roomId: string;
  handleCloseChat: () => void;
}) => {
  const chats = useChatStore(state => state.chats);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <Flex
      direction="column"
      className={styles["slide-up"]}
      style={{
        position: "absolute",
        bottom: "4px",
        right: "0",
        width: "10rem",
        height: "60vh",
        zIndex: 2,

        backgroundColor: vars.colors.grey[50],
        border: `3px solid ${vars.colors.grey[300]}`,
        borderRadius: "0.125rem",
        boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Button size="xs" onClick={handleCloseChat}>
        접기
      </Button>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: "0.5rem",
          overflowY: "auto",
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
      <ChatInput roomId={roomId} />
    </Flex>
  );
};
