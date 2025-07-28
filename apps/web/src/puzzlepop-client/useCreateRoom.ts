import { useState } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useNavigation } from "@router/useNavigation";
import { isRemoteError } from "@shared-utils/error";
import { generateRandomNickname, generateRandomRoomTitle } from "@shared-utils/autoTextGenerator";

import * as API from "@remotes-main/apis";
import { getMultiGameStorage } from "./storage";

export const useCreateRoom = (gameType: "COOPERATION" | "BATTLE") => {
  const navigate = useNavigation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [roomTitle, setRoomTitle] = useState(generateRandomRoomTitle());
  const [nickname, setNickname] = useState(generateRandomNickname());
  const [roomSize, setRoomSize] = useState(1);

  const onFetchCreateRoom = async (e: React.FormEvent) => {
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
      const newRoom = await API.postCreateRoom({
        roomTitle,
        userId: nickname,
        roomSize,
        gameType,
      });

      getMultiGameStorage().setItem({
        id: nickname,
        team: "RED",
      });

      const path = gameType === "COOPERATION" ? "/multi/cooperation" : "/multi/battle";
      navigate.push(path, newRoom.gameId);
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

  return {
    isLoading,
    roomTitle,
    setRoomTitle,
    nickname,
    setNickname,
    roomSize,
    setRoomSize,
    onFetchCreateRoom,
  };
};
