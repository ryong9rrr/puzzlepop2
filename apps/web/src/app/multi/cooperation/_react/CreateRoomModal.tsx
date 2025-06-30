"use client";

import { Button } from "@puzzlepop2/react-components-button";

import { ModalLayout } from "./ModalLayout";
import { ModalForm } from "./ModalForm";
import { TextField } from "./TextField";
import { RoomSizeField } from "./RoomSizeField";
import { useCooperationCreateOrEnterForm } from "./useCooperationCreateOrEnterForm";

interface Props {
  onCloseModal: () => void;
}

export const CreateRoomModal = (props: Props) => {
  const { onCloseModal } = props;

  const {
    roomTitle,
    onChangeRoomTitle,
    roomSize,
    onDecreaseRoomSize,
    onIncreaseRoomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
    nickname,
    onChangeNickname,
    isLoadingFetchCreateRoom,
    fetchCreateRoom,
  } = useCooperationCreateOrEnterForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCreateRoom();
  };

  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <ModalForm onSubmit={handleSubmit}>
        <TextField title="방 이름" value={roomTitle} onChange={onChangeRoomTitle} />
        <RoomSizeField
          roomSize={roomSize}
          onDecrease={onDecreaseRoomSize}
          onIncrease={onIncreaseRoomSize}
          isDisabledDecrease={isDisabledDecreaseRoomSize}
          isDisabledIncrease={isDisabledIncreaseRoomSize}
        />
        <TextField title="닉네임" value={nickname} onChange={onChangeNickname} />
        <Button
          type="submit"
          onClick={fetchCreateRoom}
          isDisabled={isLoadingFetchCreateRoom || !roomTitle || !nickname}
        >
          방 만들기
        </Button>
      </ModalForm>
    </ModalLayout>
  );
};
