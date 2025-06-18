"use client";

import { Button } from "@puzzlepop2/react-components-button";
import { ModalLayout, FieldText, FieldRoomSize } from "@/components/games/room-cards";
import { useCreateCooperationGameRoom } from "@/hooks/games/useCreateCooperationGameRoom";

interface Props {
  onCloseModal: () => void;
}

export const CreateRoomModal = (props: Props) => {
  const { onCloseModal } = props;

  const {
    roomTitle,
    onChangeRoomTitle,
    nickname,
    onChangeNickname,
    roomSize,
    onDecreaseRoomSize,
    onIncreaseRoomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
    isFetchCreateRoomLoading,
    onConfirmCreateRoom,
  } = useCreateCooperationGameRoom();

  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <FieldText title="방 이름" value={roomTitle} onChange={onChangeRoomTitle} />
      <FieldRoomSize
        roomSize={roomSize}
        onDecrease={onDecreaseRoomSize}
        onIncrease={onIncreaseRoomSize}
        isDisabledDecrease={isDisabledDecreaseRoomSize}
        isDisabledIncrease={isDisabledIncreaseRoomSize}
      />
      <FieldText title="닉네임" value={nickname} onChange={onChangeNickname} />
      <Button
        onClick={onConfirmCreateRoom}
        isDisabled={isFetchCreateRoomLoading || !roomTitle || !nickname}
      >
        방 만들기
      </Button>
    </ModalLayout>
  );
};
