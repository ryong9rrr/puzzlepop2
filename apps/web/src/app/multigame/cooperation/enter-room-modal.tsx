"use client";

import { Button } from "@puzzlepop2/react-components-button";
import { FieldText, ModalLayout } from "@/components/games/room-cards";
import { useGameForm } from "@/hooks/games/useGameForm";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const { nickname, onChangeNickname, fetchEnterRoom } = useGameForm();

  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <FieldText title="닉네임" value={nickname} onChange={onChangeNickname} />
      <Button onClick={() => fetchEnterRoom(roomId)} isDisabled={!nickname}>
        입장하기
      </Button>
    </ModalLayout>
  );
};
