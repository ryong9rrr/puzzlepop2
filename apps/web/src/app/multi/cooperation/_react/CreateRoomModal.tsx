"use client";

import { IoClose } from "react-icons/io5";

import { useToast } from "@puzzlepop2/react-hooks-toast";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";

import { useNavigation } from "@router/useNavigation";
import { TextField } from "@shared-components/TextField";
import { RoomSizeField } from "@shared-components/RoomSizeField";

import { useCreateRoom } from "@puzzlepop-client/useCreateRoom";

interface Props {
  onCloseModal: () => void;
}

export const CreateRoomModal = (props: Props) => {
  const { onCloseModal } = props;

  const navigate = useNavigation();
  const { toast } = useToast();

  const {
    isLoading,
    roomTitle,
    setRoomTitle,
    nickname,
    setNickname,
    roomSize,
    setRoomSize,
    fetchGetNewRoom,
  } = useCreateRoom("COOPERATION");

  const onSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRoom = await fetchGetNewRoom(e);
      navigate.push("/multi/cooperation", newRoom.gameId);
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
        <form onSubmit={onSummit}>
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
