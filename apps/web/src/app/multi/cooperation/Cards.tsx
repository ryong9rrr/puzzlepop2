"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { useModal } from "@puzzlepop2/react-hooks-modal";
import { usePromise } from "@puzzlepop2/react-hooks-base";

import { getRoomList } from "@remotes-main/apis";

import { CardGridHeader } from "./CardGridHeader";
import { CreateRoomModal } from "./CreateRoomModal";
import { EnterRoomModal } from "./EnterRoomModal";
import { CardGrid } from "./CardGrid";

export const Cards = () => {
  const { open, close } = useModal();

  const { data, isPending, isError, refetch } = usePromise(() => getRoomList("cooperation"));

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
      <CardGridHeader
        isLoading={isPending}
        onCreateRoom={handleClickCreateRoomButton}
        onRefresh={refetch}
      />
      <Spacing scale={0.8} />

      {rooms.length === 0 && (
        <Flex direction="column" justify="center" align="center">
          <Spacing scale={1} />
          <Text size="xs">{isError ? "오류가 발생했어요." : "생성된 게임이 없어요."}</Text>
        </Flex>
      )}
      <CardGrid color="lavender" rooms={rooms} onClickCard={handleClickRoomCard} />
    </>
  );
};
