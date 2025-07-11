"use client";

import { useCallback } from "react";
import { vars } from "@puzzlepop2/themes";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { useAutoFocusInput } from "@shared-hooks/useAutoFocusInput";

import { socket } from "@remotes-main/socketStore";
import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { useWaiting } from "./useWaiting";
import { PlayerCardGrid } from "./PlayerCardGrid";
import { Picture } from "./Picture";

const { send } = socket;

export const Waiting = ({ roomId }: { roomId: string }) => {
  const { inputRef: chatInputRef } = useAutoFocusInput();

  const { isCompleteConnectSocket, gameData, chats, onSubmitChat } = useWaiting({
    roomId,
    debugGameData: gameData => {
      console.log("Game Data:", gameData);
    },
    debugChatData: chatData => {
      console.log("Chat Data:", chatData);
    },
  });

  const handleClickGameStart = useCallback(() => {
    if (!gameData || typeof window === "undefined") {
      return true;
    }

    const me = getCooperationGameSessionStorage().getItem();
    if (me.id !== gameData.admin.id) {
      return;
    }

    console.log("게임 시작 요청...");

    send({
      type: "GAME",
      message: "GAME_START",
      sender: me.id,
      roomId,
    });
  }, []);

  const isDisabledButton = () => {
    if (!gameData || typeof window === "undefined") {
      return true;
    }
    const me = getCooperationGameSessionStorage().getItem();
    return gameData.admin.id !== me.id;
  };

  const getButtonText = () => {
    if (!gameData || typeof window === "undefined") {
      return "";
    }
    const me = getCooperationGameSessionStorage().getItem();
    return me.id === gameData.admin.id ? "게임 시작" : "대기 중";
  };

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
              <Text bold className="ellipsis font-gameTitle">
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

          <Flex
            direction="column"
            style={{
              padding: "0.25rem",
              width: "10rem",
              borderRadius: "0.125rem",
              border: `3px solid ${vars.colors.grey[300]}`,
              backgroundColor: vars.colors.grey[50],
            }}
          >
            <AlertClient>
              <Picture />
            </AlertClient>
            <div style={{ flex: 1 }}></div>
            <Text size="xs" color="green" bold style={{ textAlign: "center" }}>
              방장이 게임을 시작할 수 있어요.
            </Text>
            <Spacing size={8} />
            <Button
              className="font-gameBasic"
              style={{ paddingBottom: "0.45rem" }}
              isDisabled={isDisabledButton()}
              onClick={handleClickGameStart}
            >
              {getButtonText()}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
