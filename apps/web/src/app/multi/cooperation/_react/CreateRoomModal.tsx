"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { useNavigation } from "@router/useNavigation";
import { TextField } from "@shared-components/TextField";
import { RoomSizeField } from "@shared-components/RoomSizeField";
import { isRemoteError } from "@shared-utils/error";
import { generateRandomNickname, generateRandomRoomTitle } from "@shared-utils/autoTextGenerator";

import { createGameRoom } from "@remotes-main/http/cooperation";
import { getCooperationGameSessionStorage } from "../_storages/cooperationGameSessionStorage";

interface Props {
  onCloseModal: () => void;
}

export const CreateRoomModal = (props: Props) => {
  const { onCloseModal } = props;

  const navigate = useNavigation();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [roomTitle, setRoomTitle] = useState(generateRandomRoomTitle());
  const [nickname, setNickname] = useState(generateRandomNickname());
  const [roomSize, setRoomSize] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomTitle || !nickname) {
      toast({
        payload: {
          message: "방 이름과 유저 아이디를 입력해주세요.",
        },
      });
      return;
    }

    // TODO: 욕설이나 선정적인 텍스트 검증

    try {
      setIsLoading(true);
      const newRoom = await createGameRoom({
        roomTitle,
        userId: nickname,
        roomSize,
      });

      getCooperationGameSessionStorage().setItem({
        id: nickname,
        team: "RED",
      });

      navigate.push("/multi/cooperation", {
        slug: newRoom.gameId,
      });
    } catch (error) {
      if (isRemoteError(error)) {
        toast({
          payload: {
            message: error.message,
          },
        });
        setIsLoading(false);
        return;
      }

      toast({
        payload: {
          message: "게임방 생성에 실패했습니다. 다시 시도해주세요.",
        },
      });
      setIsLoading(false);
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
        <form onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              onClick={handleSubmit}
              isDisabled={!roomTitle || !nickname || isLoading}
            >
              방 만들기
            </Button>
          </Flex>
        </form>
      </Box>

      <Spacing scale={0.5} />
    </>
  );
};
