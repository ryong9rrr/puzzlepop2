"use client";

import { useState } from "react";
import { generateRandomNickname } from "@/utils/auto-text/generator";

interface Props {
  roomId: string;
}

export const useEnterGameRoom = (props: Props) => {
  const { roomId } = props;

  const [nickname, setNickname] = useState(generateRandomNickname());

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onConfirmEnterRoom = () => {
    if (!nickname) {
      return;
    }

    console.log(`${roomId} 로 입장해야함`);
  };

  return {
    nickname,
    onChangeNickname,
    onConfirmEnterRoom,
  };
};
