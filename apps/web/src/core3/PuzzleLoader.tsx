"use client";

import { usePromise } from "@puzzlepop2/react-hooks-base";
import { Dimmed, Flex, Text } from "@puzzlepop2/react-components-layout";
import { PuzzleEngine } from "./engine/PuzzleEngine";
import { PuzzleEngineProps } from "./engine/types";

export const PuzzleLoader = (props: PuzzleEngineProps) => {
  const { isPending, isError, data } = usePromise<PuzzleEngine>(async () => {
    const puzzleGame = new PuzzleEngine(props);

    await puzzleGame.load();
    return puzzleGame;
  });

  if (isPending) {
    return (
      <Dimmed>
        <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
          <Text>로딩 중입니다...</Text>
        </Flex>
      </Dimmed>
    );
  }

  if (isError || !data) {
    return (
      <Dimmed>
        <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
          <Text>게임을 로드하는 중 오류가 발생했습니다.</Text>
        </Flex>
      </Dimmed>
    );
  }

  return null;
};
