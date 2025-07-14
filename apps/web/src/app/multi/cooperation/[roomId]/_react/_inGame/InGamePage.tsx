"use client";

import { useEffect } from "react";
import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, IMG_ID } from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

import { socket } from "@remotes-main/socketStore";

import { useInGameStore } from "../useInGameStore";
import { Timer } from "./Timer";
import { GameClient } from "./GameClient";

const { send } = socket;

export const InGamePage = ({ roomId }: { roomId: string }) => {
  const imgSrc = useInGameStore(state => state.imgSrc);

  // 최초한번 게임 데이터 불러오기
  useEffect(() => {
    send({
      type: "GAME",
      message: "GAME_INFO",
      roomId,
      sender: "",
    });
  }, []);

  if (!imgSrc) {
    return (
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Text bold>게임 데이터를 불러오는 중입니다...</Text>
      </Flex>
    );
  }

  return (
    <>
      <Timer />
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <img id={IMG_ID} src={imgSrc} style={{ display: "none" }} />
        <canvas
          id={CANVAS_ID}
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            backgroundColor: vars.colors.grey[50],
            borderRadius: "0.25rem",
            opacity: 0.8,
            border: `3px solid ${vars.colors.grey[500]}`,
          }}
        />
      </Flex>
      <GameClient />
    </>
  );
};
