import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { Card } from "@shared-components/Card";
import { GameData } from "@shared-types/multi";

interface Props {
  mode: "COOPERATION" | "BATTLE";
  rooms: GameData[];
  isLoading: boolean;
  onClickCard?: (roomId: string) => void;
}

export const RoomCardGrid = (props: Props) => {
  const { mode, isLoading, rooms, onClickCard } = props;

  if (!isLoading && rooms.length === 0) {
    return (
      <Flex direction="column" justify="center" align="center">
        <Spacing scale={1} />
        <Text size="xs">현재 생성된 게임방이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Card.Grid>
      {rooms
        .filter(room => room.redTeam.players.length > 0)
        .map(room => {
          const 게임이_시작됐는가 = !!room.started;
          const 최대정원 = room.roomSize;
          const 현재인원 = room.redTeam.players.length;

          return (
            <Card.Item
              key={room.gameId}
              boxColor={mode === "COOPERATION" ? "lavender" : "yellow"}
              imgSrc={room.picture.encodedString}
              disabled={게임이_시작됐는가 || 현재인원 >= 최대정원}
              onClick={() => onClickCard?.(room.gameId)}
            >
              <Card.Title text={room.gameName} />
              <Flex justify="space-between" align="center">
                <Text
                  size="md"
                  bold
                  className="font-gameInline"
                  color={게임이_시작됐는가 ? vars.colors.red[400] : vars.colors.blue[400]}
                >
                  {게임이_시작됐는가 ? "Playing" : "Waiting"}
                </Text>
                <Flex direction="column" gap={12} justify="center" align="flex-end">
                  <Text
                    size="xs"
                    bold
                    color={현재인원 >= 최대정원 ? vars.colors.red[400] : vars.colors.blue[400]}
                  >
                    {현재인원} / {최대정원}
                  </Text>
                  <Text size="xs">{room.admin.id}</Text>
                </Flex>
              </Flex>
            </Card.Item>
          );
        })}
    </Card.Grid>
  );
};
