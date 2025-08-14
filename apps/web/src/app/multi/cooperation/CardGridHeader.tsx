import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";

import { RefreshButton } from "./RefreshButton";

interface Props {
  isLoading: boolean;
  onRefresh: () => void;
  onCreateRoom: () => void;
}

export const CardGridHeader = (props: Props) => {
  const { isLoading, onRefresh, onCreateRoom } = props;

  return (
    <Flex justify="space-between" align="center">
      <Flex align="center" gapScale={0.4}>
        <Text size="lg" className="font-gameTitle">
          협동 플레이
        </Text>
        <RefreshButton isLoading={isLoading} onClick={onRefresh} />
      </Flex>
      <Button
        size="xs"
        onClick={onCreateRoom}
        isDisabled={isLoading}
        style={{ fontWeight: "bold" }}
      >
        방 만들기
      </Button>
    </Flex>
  );
};
