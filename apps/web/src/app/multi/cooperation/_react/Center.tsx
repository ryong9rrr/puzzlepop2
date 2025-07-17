"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { usePromise } from "@puzzlepop2/react-hooks-base";
import { useModal } from "@puzzlepop2/react-hooks-modal";

import { getCooperationGameRoomList } from "@remotes-main/cooperation";

import { RefreshButton } from "./RefreshButton";
import { RoomCardGrid } from "./RoomCardGrid";
import { CreateRoomModal } from "./CreateRoomModal";
import { EnterRoomModal } from "./EnterRoomModal";

export const Center = () => {
  const { open, close } = useModal();

  const { data: rooms, isPending, refetch } = usePromise(getCooperationGameRoomList);

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
        mode="COOPERATION"
        rooms={rooms || []}
        isLoading={isPending}
        onClickCard={handleClickRoomCard}
      />
    </>
  );
};
