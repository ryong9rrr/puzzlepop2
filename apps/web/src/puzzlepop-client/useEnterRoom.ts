import { FormEvent, useState } from "react";
import { generateRandomNickname } from "@shared-utils/autoTextGenerator";
import { isRemoteError } from "@shared-utils/error";

import * as API from "@remotes-main/apis";
import { getMultiGameStorage } from "./storage";
import { GameInfoData } from "./types/base";

export const useEnterRoom = (roomId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState(generateRandomNickname());

  const fetchGetEnteredRoom = async (e: FormEvent): Promise<GameInfoData> => {
    e.preventDefault();

    if (!nickname) {
      throw new Error("닉네임을 입력해주세요.");
    }

    // TODO: 욕설이나 선정적인 텍스트 검증
    try {
      setIsLoading(true);
      const room = await API.postEnterRoom({
        userId: nickname,
        roomId,
      });

      getMultiGameStorage().setItem({
        id: nickname,
        team: "RED",
      });

      return room;
    } catch (error) {
      let errorMessage = "이미 게임이 시작되었거나 존재하지 않는 게임방이에요.";
      if (isRemoteError(error)) {
        errorMessage = error.message;
      }
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return {
    nickname,
    setNickname,
    isLoading,
    fetchGetEnteredRoom,
  };
};
