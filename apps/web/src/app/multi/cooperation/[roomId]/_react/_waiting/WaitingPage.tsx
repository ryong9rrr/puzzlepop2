"use client";

import { useCallback, useEffect, useState } from "react";
import { vars } from "@puzzlepop2/themes";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { useAnimatedAlert } from "@shared-hooks/useAnimatedAlert";
import { useAutoFocusInput } from "@shared-hooks/useAutoFocusInput";
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
  const [isReady, setIsReady] = useState(false);

  const { inputRef } = useAutoFocusInput();
  const { alert } = useAnimatedAlert();

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

    // 방장이 새로고침을 하거나 방을 나갔다 다시 들어오는 등의 이유로 현재 인원과 방장 정보의 싱크가 맞지 않는 서버 버그 상황
    // 에러로 간주하고 다시 방 생성 유도
    if (me.id !== admin.id) {
      console.error("게임 시작 권한이 없습니다.");
      alert("error", "문제가 발생하여 방을 다시 생성해주세요.");
      return;
    }

    setIsReady(true);
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
            <ChatInput ref={inputRef} roomId={roomId} />
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
          <Picture />
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
            isPending={isReady}
          >
            {getButtonText()}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
