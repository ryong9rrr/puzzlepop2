"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useFieldRoomSize, useFieldText } from "../forms";

import { createCooperationGameRoom } from "@/remotes/games/cooperation";

import { generateRandomNickname, generateRandomRoomTitle } from "@/utils/auto-text/generator";
import { getCooperationGameStorage } from "@/utils/storages";

export const useGameForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoadingFetchCreateRoom, setIsLoadingFetchCreateRoom] = useState(false);

  const { text: nickname, onChange: onChangeNickname } = useFieldText(generateRandomNickname());
  const { text: roomTitle, onChange: onChangeRoomTitle } = useFieldText(generateRandomRoomTitle());
  const {
    roomSize,
    onIncreaseRoomSize,
    onDecreaseRoomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
  } = useFieldRoomSize();

  const fetchCreateRoom = async () => {
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
      setIsLoadingFetchCreateRoom(true);
      const newRoom = await createCooperationGameRoom({
        roomTitle,
        userId: nickname,
        roomSize,
      });

      getCooperationGameStorage().setItem({
        id: nickname,
        team: "RED",
      });

      router.push(`/multigame/cooperation/${newRoom.gameId}`);
    } catch (error) {
      toast({
        payload: {
          message: "게임방 생성에 실패했습니다. 다시 시도해주세요.",
        },
      });
      setIsLoadingFetchCreateRoom(false);
    }
  };

  const fetchEnterRoom = (roomId: string) => {
    if (!nickname) {
      return;
    }

    console.log(`${roomId}로 입장해야함`);
  };

  return {
    nickname,
    onChangeNickname,
    roomTitle,
    onChangeRoomTitle,
    roomSize,
    onIncreaseRoomSize,
    onDecreaseRoomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
    isLoadingFetchCreateRoom,
    fetchCreateRoom,
    fetchEnterRoom,
  };
};
