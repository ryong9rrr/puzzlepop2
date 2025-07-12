"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { useInGameDataStore } from "../useInGameDataStore";

export const InGamePage = ({ roomId }: { roomId: string }) => {
  const time = useInGameDataStore(state => state.time);

  return (
    <Flex direction="column">
      <Text>{roomId}</Text>

      <Spacing scale={2} />

      <Text size="xs">게임 경과 {time}초...</Text>
    </Flex>
  );
};
