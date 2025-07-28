"use client";

import { IoClose } from "react-icons/io5";

import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";

import { TextField } from "@shared-components/TextField";
import { RoomSizeField } from "@shared-components/RoomSizeField";

import { useCreateRoom } from "@puzzlepop-client/useCreateRoom";

interface Props {
  onCloseModal: () => void;
}

export const CreateRoomModal = (props: Props) => {
  const { onCloseModal } = props;

  const {
    isLoading,
    roomTitle,
    setRoomTitle,
    nickname,
    setNickname,
    roomSize,
    setRoomSize,
    onFetchCreateRoom,
  } = useCreateRoom("COOPERATION");

  return (
    <>
      <Flex justify="flex-end" align="center">
        <Button
          size="xs"
          style={{
            padding: "0.25rem 0.5rem",
          }}
          onClick={onCloseModal}
        >
          <IoClose style={{ margin: 0, padding: 0, fontSize: "1rem" }} />
        </Button>
      </Flex>

      <Spacing scale={0.5} />

      <Box style={{ width: "40vw", padding: "0 0.5rem" }}>
        <form onSubmit={onFetchCreateRoom}>
          <Flex direction="column" gapScale={1}>
            <TextField
              title="방 이름"
              value={roomTitle}
              onChange={e => setRoomTitle(e.target.value)}
            />
            <RoomSizeField value={roomSize} setValue={setRoomSize} />
            <TextField
              title="닉네임"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <Button type="submit" isDisabled={!roomTitle || !nickname || isLoading}>
              방 만들기
            </Button>
          </Flex>
        </form>
      </Box>

      <Spacing scale={0.5} />
    </>
  );
};
