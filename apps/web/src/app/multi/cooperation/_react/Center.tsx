"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { usePromise } from "@puzzlepop2/react-hooks-base";
import { useModal } from "@puzzlepop2/react-hooks-modal";

import { getRoomList } from "@remotes-main/apis";

import { RefreshButton } from "./RefreshButton";
import { RoomCardGrid } from "./RoomCardGrid";
import { CreateRoomModal } from "./CreateRoomModal";
import { EnterRoomModal } from "./EnterRoomModal";

export const Center = () => {
  const { open, close } = useModal();

  const { data, isPending, refetch } = usePromise(() => getRoomList("cooperation"));

  const handleClickCreateRoomButton = () => {
    open({
      component: <CreateRoomModal onCloseModal={close} />,
      options: {
        closeOnEscKey: true,
      },
    });
  };

  const handleClickRoomCard = (roomId: string) => {
    open({
      component: <EnterRoomModal roomId={roomId} onCloseModal={close} />,
      options: {
        closeOnEscKey: true,
      },
    });
  };

  const rooms = data
    ? data
        .map(room => ({
          id: room.gameId,
          title: room.gameName,
          isStarted: room.started,
          adminNickname: room.admin.id,
          currentUserCount: room.redTeam.players.length,
          roomSize: room.roomSize,
          imgSrc: room.picture.encodedString,
          startTime: room.startTime,
        }))
        .filter(room => room.currentUserCount > 0)
        .sort((a, b) => {
          const aStartTime = new Date(a.startTime).getTime();
          const bStartTime = new Date(b.startTime).getTime();
          return bStartTime - aStartTime;
        })
    : [];

  return (
    <>
      <Flex justify="space-between" align="center">
        <Flex align="center" gapScale={0.4}>
          <Text size="lg" className="font-gameTitle">
            협동 플레이
          </Text>
          <RefreshButton isLoading={isPending} onClick={refetch} />
        </Flex>
        <Button
          size="xs"
          onClick={handleClickCreateRoomButton}
          isDisabled={isPending}
          style={{ fontWeight: "bold" }}
        >
          방 만들기
        </Button>
      </Flex>

      <Spacing scale={0.8} />

      <RoomCardGrid
        color="lavender"
        rooms={[
          ...rooms,
          {
            id: `sample__https://puzzlepop.site/cdn/bdfbb0f7-c8ea-4104-b3d6-bcf0e21468ea1747680621120/origin.webp`,
            title: "치이카와 귀여워",
            isStarted: true,
            adminNickname: "룡구르르",
            currentUserCount: 2,
            roomSize: 3,
            imgSrc:
              "https://puzzlepop.site/cdn/bdfbb0f7-c8ea-4104-b3d6-bcf0e21468ea1747680621120/origin.webp",
          },
          {
            id: `sample__https://puzzlepop.site/cdn/516ae116-8596-4f74-94c9-ca60d49e417c1747677367656/origin.webp`,
            title: "왼손은 거들뿐..",
            isStarted: true,
            adminNickname: "송태섭",
            currentUserCount: 1,
            roomSize: 1,
            imgSrc:
              "https://puzzlepop.site/cdn/516ae116-8596-4f74-94c9-ca60d49e417c1747677367656/origin.webp",
          },
        ]}
        isLoading={isPending}
        onClickCard={handleClickRoomCard}
      />
    </>
  );
};
