import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { CardGridContainer, CardGridItem, CardTitle } from "@puzzlepop2/react-components-card";
import { CardImage } from "@shared-components/CardImage";
import { CardGameStatus } from "@shared-components/CardGameStatus";

type Room = {
  id: string;
  title: string;
  adminNickname: string;
  currentUserCount: number;
  roomSize: number;
  imgSrc: string;
  isStarted: boolean;

  startTime?: string;
};

interface Props {
  color: "lavender" | "yellow";
  rooms: Room[];
  isLoading: boolean;
  onClickCard?: (roomId: string) => void;
}

export const CardGrid = (props: Props) => {
  const { color, rooms, isLoading, onClickCard } = props;

  const handleClickCard = (roomId: string, disabled: boolean) => {
    if (disabled) {
      return;
    }
    onClickCard?.(roomId);
  };

  if (!isLoading && rooms.length === 0) {
    return (
      <Flex direction="column" justify="center" align="center">
        <Spacing scale={1} />
        <Text size="xs">현재 생성된 게임방이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <CardGridContainer>
      {rooms.map(room => {
        const disabled = room.isStarted || room.currentUserCount >= room.roomSize;

        return (
          <CardGridItem
            key={room.id}
            disabled={disabled}
            color={color}
            onClick={() => handleClickCard(room.id, room.isStarted)}
          >
            <CardImage src={room.imgSrc} />
            <CardTitle size="sm" title={room.title} />
            <CardGameStatus
              status={room.isStarted ? "playing" : "waiting"}
              currentUserCount={room.currentUserCount}
              maxUserCount={room.roomSize}
              adminNickname={room.adminNickname}
            />
          </CardGridItem>
        );
      })}
    </CardGridContainer>
  );
};
