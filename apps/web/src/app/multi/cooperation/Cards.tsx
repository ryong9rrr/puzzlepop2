"use client";

import { Spacing } from "@puzzlepop2/react-components-layout";
import { useModal } from "@puzzlepop2/react-hooks-modal";
import { usePromise } from "@puzzlepop2/react-hooks-base";

import { getRoomList } from "@remotes-main/apis";

import { CardGridHeader } from "./CardGridHeader";
import { CreateRoomModal } from "./CreateRoomModal";
import { EnterRoomModal } from "./EnterRoomModal";
import { CardGrid } from "./CardGrid";

export const Cards = () => {
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
      <CardGridHeader
        isLoading={isPending}
        onCreateRoom={handleClickCreateRoomButton}
        onRefresh={refetch}
      />
      <Spacing scale={0.8} />
      <CardGrid
        color="lavender"
        isLoading={isPending}
        rooms={rooms}
        onClickCard={handleClickRoomCard}
      />
    </>
  );
};
