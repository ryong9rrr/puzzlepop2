"use client";

import { Button } from "@puzzlepop2/react-components-button";
import { FieldText, ModalLayout } from "@/components/games/room-cards";
import { useEnterGameRoom } from "@/hooks/games/useEnterGameRoom";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const { nickname, onChangeNickname, onConfirmEnterRoom } = useEnterGameRoom({ roomId });

  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <FieldText title="닉네임" value={nickname} onChange={onChangeNickname} />
      <Button onClick={onConfirmEnterRoom} isDisabled={!nickname}>
        입장하기
      </Button>
    </ModalLayout>
  );
};
