"use client";

import { useState } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useNavigation } from "@router/useNavigation";
import { generateRandomNickname, generateRandomRoomTitle } from "@shared-utils/autoTextGenerator";
import { isRemoteError } from "@shared-utils/error";

import { useTextField } from "./useTextField";
import { useRoomSizeField } from "./useRoomSizeField";
import { getCooperationGameSessionStorage } from "../_storages/cooperationGameSessionStorage";

import { createGameRoom, enterGameRoom } from "@remotes-main/http/cooperation";

export const useCooperationCreateOrEnterForm = () => {
  const navigate = useNavigation();
  const { toast } = useToast();

  const [isLoadingFetchCreateRoom, setIsLoadingFetchCreateRoom] = useState(false);
  const [isLoadingFetchEnterRoom, setIsLoadingFetchEnterRoom] = useState(false);

  const { text: nickname, onChange: onChangeNickname } = useTextField(generateRandomNickname());
  const { text: roomTitle, onChange: onChangeRoomTitle } = useTextField(generateRandomRoomTitle());
  const {
    roomSize,
    onIncreaseRoomSize,
    onDecreaseRoomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
  } = useRoomSizeField();

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
        setIsLoadingFetchCreateRoom(false);
        return;
      }

      toast({
        payload: {
          message: "게임방 생성에 실패했습니다. 다시 시도해주세요.",
        },
      });
      setIsLoadingFetchCreateRoom(false);
    }
  };

  const fetchEnterRoom = async (roomId: string) => {
    if (!nickname) {
      return;
    }

    // TODO: 욕설이나 선정적인 텍스트 검증
    try {
      setIsLoadingFetchEnterRoom(true);
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
        setIsLoadingFetchEnterRoom(false);
        return;
      }

      toast({
        payload: {
          message: "이미 게임이 시작되었거나 존재하지 않는 게임방입니다.",
        },
      });
      setIsLoadingFetchEnterRoom(false);
    }
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
    isLoadingFetchEnterRoom,
  };
};
