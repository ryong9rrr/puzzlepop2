"use client";

import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { useInGameStore } from "../useInGameStore";
import { Button } from "@puzzlepop2/react-components-button";
import { socket } from "@remotes-main/socketStore";

const { send } = socket;

export const Timer = ({ roomId }: { roomId: string }) => {
  const time = useInGameStore(state => state.time);

  const HHMMSS = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const 테스트버튼 = () => {
    send({
      type: "GAME",
      message: "GAME_INFO",
      roomId,
      sender: "",
    });
  };

  // TODO: 나중에 스타일 수정
  return (
    <div
      style={{
        position: "absolute",
        top: "4px",
        right: "4px",
        border: `4px solid ${vars.colors.orange[400]}`,
        width: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.25rem",
        backgroundColor: vars.colors.grey[50],
        backdropFilter: "blur(5px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: "0.5rem",
        zIndex: 1000,
      }}
    >
      <Flex direction="column" align="center">
        <Text size="sm" bold>
          {HHMMSS(time)}
        </Text>
        <Button size="xs" onClick={테스트버튼}>
          데이터 호출
        </Button>
      </Flex>
    </div>
  );
};
