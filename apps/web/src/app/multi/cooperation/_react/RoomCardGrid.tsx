import Image from "next/image";
import { clsx } from "clsx";
import { Flex, Grid, GridItem, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import MODULE_CSS from "./RoomCardGrid.module.css";

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

export const RoomCardGrid = (props: Props) => {
  const { color, isLoading, rooms, onClickCard } = props;

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
      {rooms.map(room => {
        const 최대정원 = room.roomSize;
        const 현재인원 = room.currentUserCount;
        const disabled = room.isStarted || 현재인원 >= 최대정원;

        return (
          <GridItem
            key={room.id}
            className={clsx(
              MODULE_CSS.hoverGrow,
              MODULE_CSS.box,
              MODULE_CSS[`box-${color}`],
              disabled && MODULE_CSS["not-allowed"],
            )}
            onClick={() => {
              handleClickCard(room.id, disabled);
            }}
          >
            <Flex direction="column" gapScale={0.4}>
              <div className={MODULE_CSS.imageContainer}>
                <Image
                  src={room.imgSrc}
                  alt=""
                  fill
                  sizes="25vw"
                  className={MODULE_CSS.image}
                  priority
                  unoptimized
                  style={{
                    pointerEvents: "none",
                  }}
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
                {room.title}
              </Text>
              <Flex justify="space-between" align="center">
                <Text
                  size="md"
                  bold
                  className="font-gameInline"
                  color={room.isStarted ? vars.colors.red[400] : vars.colors.blue[400]}
                >
                  {room.isStarted ? "Playing" : "Waiting"}
                </Text>
                <Flex direction="column" gap={12} justify="center" align="flex-end">
                  <Text
                    size="xs"
                    bold
                    color={현재인원 >= 최대정원 ? vars.colors.red[400] : vars.colors.blue[400]}
                  >
                    {현재인원} / {최대정원}
                  </Text>
                  <Text size="xs">{room.adminNickname}</Text>
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
