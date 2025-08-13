"use client";

import { IoClose } from "react-icons/io5";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";

import { useNavigation } from "@router/useNavigation";
import { TextField } from "@shared-components/TextField";

import { useEnterRoom } from "@puzzlepop-client/useEnterRoom";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const { toast } = useToast();
  const navigate = useNavigation();

  const { nickname, setNickname, isLoading, fetchGetEnteredRoom } = useEnterRoom(roomId);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const enteredRoom = await fetchGetEnteredRoom(e);
      navigate.push("/multi/cooperation", {
        slug: enteredRoom.gameId,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          payload: {
            message: error.message,
          },
        });
        return;
      }
      toast({
        payload: {
          message: "다시 시도해주세요.",
        },
      });
    }
  };

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
        <form onSubmit={onSubmit}>
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
