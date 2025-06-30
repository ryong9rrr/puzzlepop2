"use client";

import { FormEvent } from "react";
import { Button } from "@puzzlepop2/react-components-button";

import { ModalLayout } from "./ModalLayout";
import { ModalForm } from "./ModalForm";
import { TextField } from "./TextField";
import { useCooperationCreateOrEnterForm } from "./useCooperationCreateOrEnterForm";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const { nickname, onChangeNickname, isLoadingFetchEnterRoom, fetchEnterRoom } =
    useCooperationCreateOrEnterForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchEnterRoom(roomId);
  };

  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <ModalForm onSubmit={handleSubmit}>
        <TextField title="닉네임" value={nickname} onChange={onChangeNickname} />
        <Button
          type="submit"
          onClick={() => fetchEnterRoom(roomId)}
          isDisabled={!nickname || isLoadingFetchEnterRoom}
        >
          입장하기
        </Button>
      </ModalForm>
    </ModalLayout>
  );
};
