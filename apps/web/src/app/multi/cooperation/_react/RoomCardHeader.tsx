import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { RefreshButton } from "./RefreshButton";

interface Props {
  mode: "COOPERATION" | "BATTLE";

  isLoading: boolean;
  onClickRefreshButton: () => void;
  onClickCreateRoomButton: () => void;
}

export const RoomCardHeader = (props: Props) => {
  const { mode, isLoading, onClickRefreshButton, onClickCreateRoomButton } = props;

  return (
    <>
      <Flex justify="space-between" align="center">
        <Flex align="center" gapScale={0.4}>
          <Text size="lg" className="font-gameTitle">
            {mode === "COOPERATION" ? "협동" : "대전"} 플레이
          </Text>
          <RefreshButton isLoading={isLoading} onClick={onClickRefreshButton} />
        </Flex>
        <Button
          size="xs"
          onClick={onClickCreateRoomButton}
          isDisabled={isLoading}
          style={{ fontWeight: "bold" }}
        >
          방 만들기
        </Button>
      </Flex>
      <Spacing scale={0.8} />
    </>
  );
};
