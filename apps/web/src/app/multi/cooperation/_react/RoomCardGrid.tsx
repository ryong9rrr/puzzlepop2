import Image from "next/image";
import clsx from "clsx";
import { Flex, Grid, GridItem, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { CooperationWaitingGameData } from "@puzzlepop2/game-core";

import MODULE_CSS from "./RoomCardGrid.module.css";

interface Props {
  mode: "COOPERATION" | "BATTLE";
  rooms: CooperationWaitingGameData[];
  isLoading: boolean;
  onClickCard?: (roomId: string) => void;
}

export const RoomCardGrid = (props: Props) => {
  const { mode, isLoading, rooms, onClickCard } = props;

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
    <Grid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {rooms
        .filter(room => room.redTeam.players.length > 0)
        .sort((a, b) => {
          const aStartTime = new Date(a.startTime).getTime();
          const bStartTime = new Date(b.startTime).getTime();
          return bStartTime - aStartTime;
        })
        .map(room => {
          const 게임이_시작됐는가 = !!room.started;
          const 최대정원 = room.roomSize;
          const 현재인원 = room.redTeam.players.length;

          const disabled = 게임이_시작됐는가 || 현재인원 >= 최대정원;

          return (
            <GridItem
              key={room.gameId}
              className={clsx(
                MODULE_CSS.hoverGrow,
                MODULE_CSS.box,
                MODULE_CSS[`box-${mode === "COOPERATION" ? "lavender" : "yellow"}`],
                disabled && MODULE_CSS["not-allowed"],
              )}
              onClick={() => {
                handleClickCard(room.gameId, disabled);
              }}
            >
              <Flex direction="column" gapScale={0.4}>
                <div className={MODULE_CSS.imageContainer}>
                  <Image
                    src={room.picture.encodedString}
                    alt=""
                    fill
                    sizes="25vw"
                    className={MODULE_CSS.image}
                  />
                </div>
                <Text
                  style={{
                    width: "25vw",
                  }}
                  className="ellipsis"
                  size="sm"
                  bold
                >
                  {room.gameName}
                </Text>
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
                <Spacing scale={0.1} />
              </Flex>
            </GridItem>
          );
        })}
    </Grid>
  );
};
