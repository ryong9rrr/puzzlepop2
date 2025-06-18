"use client";

import { useModal } from "@puzzlepop2/react-hooks-modal";
import { RoomCardsGrid, RoomCardsHeader } from "@/components/games/room-cards";
import { useGameRooms } from "@/hooks/games/useGameRooms";
import { getCooperationGameRoomList } from "@/remotes/games/cooperation";
import { CreateRoomModal } from "./create-room-modal";
import { EnterRoomModal } from "./enter-room-modal";

export const Rooms = () => {
  const { open, close } = useModal();

  const {
    isLoading: isLoadingFetchGameRooms,
    onFetch: onFetchGameRooms,
    rooms,
  } = useGameRooms({
    fetchFn: getCooperationGameRoomList,
  });

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

  return (
    <>
      <RoomCardsHeader
        mode="COOPERATION"
        isLoading={isLoadingFetchGameRooms}
        onClickRefreshButton={onFetchGameRooms}
        onClickCreateRoomButton={handleClickCreateRoomButton}
      />

      <RoomCardsGrid
        mode="COOPERATION"
        rooms={rooms}
        isLoading={isLoadingFetchGameRooms}
        onClickCard={handleClickRoomCard}
      />
    </>
  );
};
