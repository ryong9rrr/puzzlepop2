"use client";

import { useCallback } from "react";
import { vars } from "@puzzlepop2/themes";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { wait } from "@shared-utils/promises";

import { PlayerCardGrid } from "./PlayerCardGrid";
import { Picture } from "./Picture";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";

import { socket } from "@remotes-main/socketStore";
import { getCooperationGameSessionStorage } from "../../../_storages/cooperationGameSessionStorage";
import { useWaitingStore } from "../useWaitingStore";
import { useChatStore } from "../useChatStore";

const { send } = socket;

export const WaitingPage = ({ roomId }: { roomId: string }) => {
  const roomTitle = useWaitingStore(state => state.roomTitle);
  const roomSize = useWaitingStore(state => state.roomSize);
  const players = useWaitingStore(state => state.players);
  const admin = useWaitingStore(state => state.admin);

  const sendSystemMessage = useChatStore(state => state.sendSystemMessage);

  const 정원현황 = roomSize === 0 ? "" : `${players.length}/${roomSize}`;

  const isDisabledButton = () => {
    if (!admin || typeof window === "undefined") {
      return true;
    }
    const me = getCooperationGameSessionStorage().getItem();
    return admin.id !== me.id;
  };

  const getButtonText = () => {
    if (!admin || typeof window === "undefined") {
      return "";
    }
    const me = getCooperationGameSessionStorage().getItem();
    return me.id === admin.id ? "게임 시작" : "대기 중";
  };

  const handleClickGameStart = useCallback(async () => {
    if (!admin || typeof window === "undefined") {
      console.error("게임 데이터가 없습니다.");
      return;
    }

    const me = getCooperationGameSessionStorage().getItem();

    if (me.id !== admin.id) {
      console.error("게임 시작 권한이 없습니다.");
      return;
    }

    for (let second = 5; second > 0; second -= 1) {
      sendSystemMessage({ roomId, message: `${second}초 뒤 게임이 시작됩니다.` });
      await wait(1000);
    }
    send({
      type: "GAME",
      message: "GAME_START",
      sender: me.id,
      roomId,
    });
  }, []);

  return (
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
            <ChatHistory />
            <ChatInput roomId={roomId} />
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
  );
};
