"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@puzzlepop2/react-hooks-toast";

import { generateRandomNickname, generateRandomRoomTitle } from "@/utils/auto-text/generator";
import { createCooperationGameRoom } from "@/remotes/games/cooperation";
import { getCooperationGameStorage } from "@/utils/storages";

const ROOM_SIZE_MIN = 1; // 최소 인원
const ROOM_SIZE_MAX = 8; // 최대 인원

export const useCreateCooperationGameRoom = () => {
  const router = useRouter();
  const { toast } = useToast();

  // TODO: 로그인한 유저라면 디폴트로 유저닉네임
  const [nickname, setNickname] = useState(generateRandomNickname());
  const [roomTitle, setRoomTitle] = useState(generateRandomRoomTitle());
  const [roomSize, setRoomSize] = useState(ROOM_SIZE_MIN); // 1인이상 8인 이하

  const isDisabledDecreaseRoomSize = useMemo(() => {
    return roomSize <= ROOM_SIZE_MIN;
  }, [roomSize]);

  const isDisabledIncreaseRoomSize = useMemo(() => {
    return roomSize >= ROOM_SIZE_MAX;
  }, [roomSize]);

  const [isFetchCreateRoomLoading, setIsFetchCreateRoomLoading] = useState(false);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeRoomTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const onDecreaseRoomSize = () => {
    setRoomSize(prev => Math.max(ROOM_SIZE_MIN, prev - 1));
  };

  const onIncreaseRoomSize = () => {
    setRoomSize(prev => Math.min(ROOM_SIZE_MAX, prev + 1));
  };

  const onConfirmCreateRoom = async () => {
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
      setIsFetchCreateRoomLoading(true);
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
      setIsFetchCreateRoomLoading(false);
      return;
    }
  };

  return {
    nickname,
    roomTitle,
    roomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
    isFetchCreateRoomLoading,
    onChangeNickname,
    onChangeRoomTitle,
    onDecreaseRoomSize,
    onIncreaseRoomSize,
    onConfirmCreateRoom,
  };
};
