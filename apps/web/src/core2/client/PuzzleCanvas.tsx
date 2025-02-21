"use client";

import { Dimmed, Flex, Text } from "@puzzlepop2/react-components-layout";
import { usePromise } from "@puzzlepop2/react-hooks-base";
import { PuzzleGame } from "../puzzle-game";

export const PuzzleCanvas = () => {
  const { isPending, isError, data } = usePromise<PuzzleGame>(async () => {
    const puzzleGame = new PuzzleGame({
      gameLevel: "easy",
    });
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
