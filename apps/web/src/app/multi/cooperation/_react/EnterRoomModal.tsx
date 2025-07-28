"use client";

import { IoClose } from "react-icons/io5";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { TextField } from "@shared-components/TextField";

import { useEnterRoom } from "../../../../puzzlepop/useEnterRoom";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const { nickname, setNickname, isLoading, onFetchEnterRoom } = useEnterRoom({
    roomId,
    gameType: "COOPERATION",
  });

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
        <form onSubmit={onFetchEnterRoom}>
          <Flex direction="column" gapScale={1}>
            <TextField
              title="닉네임"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <Button type="submit" isDisabled={!nickname || isLoading}>
              입장하기
            </Button>
          </Flex>
        </form>
      </Box>

      <Spacing scale={0.5} />
    </>
  );
};
