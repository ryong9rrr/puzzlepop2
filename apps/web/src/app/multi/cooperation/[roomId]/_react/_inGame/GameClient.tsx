"use client";

import { Dimmed, Flex, Text } from "@puzzlepop2/react-components-layout";
import { usePromise } from "@puzzlepop2/react-hooks-base";

import { useInGameStore } from "../useInGameStore";
import { load } from "./_canvas/load";

export const GameClient = () => {
  const pieceSize = useInGameStore(state => state.pieceSize);
  const widthCount = useInGameStore(state => state.widthCount);
  const lengthCount = useInGameStore(state => state.lengthCount);

  const { isPending, isError } = usePromise(() => {
    return load({
      bundles: [],
      pieceSize,
      widthCount,
      lengthCount,
    });
  });

  if (isError) {
    console.error("게임 로드 중 오류 발생");
    return (
      <Dimmed>
        <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
          <Text>게임을 로드하는 중 오류가 발생했습니다.</Text>
        </Flex>
      </Dimmed>
    );
  }

  if (isPending) {
    console.log("게임 로딩 중...");
  }
  return null;
};
