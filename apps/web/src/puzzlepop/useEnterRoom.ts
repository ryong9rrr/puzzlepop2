import { FormEvent, useState } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useNavigation } from "@router/useNavigation";
import { generateRandomNickname } from "@shared-utils/autoTextGenerator";
import { isRemoteError } from "@shared-utils/error";

import * as API from "@remotes-main/apis";
import { getMultiGameStorage } from "./storage";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const useEnterRoom = (props: Props) => {
  const { roomId, gameType } = props;

  const navigate = useNavigation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState(generateRandomNickname());

  const onFetchEnterRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      return;
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

      const path = gameType === "COOPERATION" ? "/multi/cooperation" : "/multi/battle";
      navigate.push(path, room.gameId);
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

  return {
    nickname,
    setNickname,
    isLoading,
    onFetchEnterRoom,
  };
};
