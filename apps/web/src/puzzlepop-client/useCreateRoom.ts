import { useState } from "react";
import { isRemoteError } from "@shared-utils/error";
import { generateRandomNickname, generateRandomRoomTitle } from "@shared-utils/autoTextGenerator";

import * as API from "@remotes-main/apis";
import { getMultiGameStorage } from "./storage";
import { GameInfoData } from "./types/base";

export const useCreateRoom = (gameType: "COOPERATION" | "BATTLE") => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomTitle, setRoomTitle] = useState(generateRandomRoomTitle());
  const [nickname, setNickname] = useState(generateRandomNickname());
  const [roomSize, setRoomSize] = useState(1);

  const fetchGetNewRoom = async (e: React.FormEvent): Promise<GameInfoData> => {
    e.preventDefault();

    if (!roomTitle || !nickname) {
      throw new Error("방 이름과 유저 아이디를 입력해주세요.");
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

      return newRoom;
    } catch (error) {
      let errorMessage = "게임방 생성에 실패했습니다. 다시 시도해주세요.";
      if (isRemoteError(error)) {
        errorMessage = error.message;
        // toast({
        //   payload: {
        //     message: error.message,
        //   },
        // });
      }
      setIsLoading(false);
      throw new Error(errorMessage);
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
    fetchGetNewRoom,
  };
};
