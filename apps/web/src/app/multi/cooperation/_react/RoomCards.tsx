"use client";

import { useCallback, useEffect, useState } from "react";
import { useModal } from "@puzzlepop2/react-hooks-modal";
import { GameData } from "@shared-types/multi";

import { CreateRoomModal } from "./CreateRoomModal";
import { EnterRoomModal } from "./EnterRoomModal";
import { RoomCardHeader } from "./RoomCardHeader";
import { RoomCardGrid } from "./RoomCardGrid";

import { getCooperationGameRoomList } from "@remotes-main/http/cooperation";

export const RoomCards = () => {
  const { open, close } = useModal();

  const {
    isLoading: isLoadingFetchGameRooms,
    onFetch: onFetchGameRooms,
    rooms,
  } = useRoomCards({
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
      <RoomCardHeader
        mode="COOPERATION"
        isLoading={isLoadingFetchGameRooms}
        onClickRefreshButton={onFetchGameRooms}
        onClickCreateRoomButton={handleClickCreateRoomButton}
      />

      <RoomCardGrid
        mode="COOPERATION"
        rooms={rooms}
        isLoading={isLoadingFetchGameRooms}
        onClickCard={handleClickRoomCard}
      />
    </>
  );
};

interface Props {
  fetchFn?: () => Promise<GameData[]>;
}

const useRoomCards = (props: Props) => {
  const { fetchFn } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<GameData[]>([]);

  const onFetch = useCallback(async () => {
    if (!fetchFn) {
      return;
    }

    setIsLoading(true);
    const nextRooms = await fetchFn();
    setRooms(nextRooms);
    setIsLoading(false);
  }, [fetchFn]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return {
    isLoading,
    rooms,
    onFetch,
  };
};
