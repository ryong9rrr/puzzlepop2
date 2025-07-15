"use client";

import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useNavigation } from "@router/useNavigation";
import { TextField } from "@shared-components/TextField";
import { isRemoteError } from "@shared-utils/error";
import { generateRandomNickname } from "@shared-utils/autoTextGenerator";

import { enterGameRoom } from "@remotes-main/http/cooperation";
import { getCooperationGameSessionStorage } from "../_storages/cooperationGameSessionStorage";

interface Props {
  roomId: string;
  onCloseModal: () => void;
}

export const EnterRoomModal = (props: Props) => {
  const { onCloseModal, roomId } = props;

  const navigate = useNavigation();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [nickname, setNickname] = useState(generateRandomNickname());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      return;
    }

    // TODO: 욕설이나 선정적인 텍스트 검증
    try {
      setIsLoading(true);
      const room = await enterGameRoom({
        userId: nickname,
        roomId,
      });

      getCooperationGameSessionStorage().setItem({
        id: nickname,
        team: "RED",
      });

      navigate.push("/multi/cooperation", {
        slug: room.gameId,
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
          message: "이미 게임이 시작되었거나 존재하지 않는 게임방입니다.",
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
              title="닉네임"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <Button type="submit" onClick={handleSubmit} isDisabled={!nickname || isLoading}>
              입장하기
            </Button>
          </Flex>
        </form>
      </Box>

      <Spacing scale={0.5} />
    </>
  );
};
