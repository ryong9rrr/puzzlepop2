"use client";

import { SingleGameLevelType, SingleGameModeType } from "@puzzlepop2/game-core";
import { Dimmed, Flex, Text } from "@puzzlepop2/react-components-layout";
import { usePromise } from "@puzzlepop2/react-hooks-base";
import { load } from "./canvas";

export type GameClientProps = {
  mode: SingleGameModeType;
  src: string;
  level: SingleGameLevelType;
};

export const GameClient = (props: GameClientProps) => {
  const { mode, src, level } = props;

  const { isPending, isError } = usePromise(async () => {
    return load({ src, level });
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

  if (isError) {
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
