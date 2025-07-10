"use client";

import { useEffect, useRef } from "react";
import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";

import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { useWaiting } from "./useWaiting";
import { PlayerCardGrid } from "./PlayerCardGrid";

export const Waiting = ({ roomId }: { roomId: string }) => {
  const { chatInputRef } = useAutoChatInputFocus();

  const { isCompleteConnectSocket, gameData, chats, onSubmitChat } = useWaiting({
    roomId,
    debugGameData: gameData => {
      console.log("Game Data:", gameData);
    },
    debugChatData: chatData => {
      console.log("Chat Data:", chatData);
    },
  });

  const roomTitle = gameData ? gameData.gameName : "";
  const 정원현황 = gameData ? `${gameData.redTeam.players.length}/${gameData.roomSize}` : "";

  return (
    <>
      <LoadingOverlay isLoadingComplete={isCompleteConnectSocket} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        gapScale={0.5}
        style={{ height: "100vh" }}
      >
        <Flex style={{ boxSizing: "border-box", padding: "0 1rem" }} gapScale={0.5}>
          <Flex direction="column" justify="center" gapScale={0.5} style={{ width: "22rem" }}>
            <Flex
              justify="space-between"
              align="center"
              gapScale={1}
              style={{
                boxSizing: "border-box",
                border: `3px solid ${vars.colors.grey[300]}`,
                width: "100%",
                borderRadius: "0.125rem",
                padding: "0.5rem",
                backgroundColor: vars.colors.grey[50],
              }}
            >
              <Text size="sm" bold className="ellipsis">
                {roomTitle}
              </Text>
              <Text size="sm" bold>
                {정원현황}
              </Text>
            </Flex>

            <PlayerCardGrid />

            <Flex direction="column">
              <ChatHistory chats={chats} />
              <ChatInput ref={chatInputRef} onSubmit={onSubmitChat} />
            </Flex>
          </Flex>

          <div
            style={{
              width: "10rem",
              borderRadius: "0.125rem",
              border: `3px solid ${vars.colors.grey[300]}`,
            }}
          >
            Right
          </div>
        </Flex>
      </Flex>
    </>
  );
};

const useAutoChatInputFocus = () => {
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, []);

  return { chatInputRef };
};
