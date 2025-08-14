import { RemoteError } from "@shared-utils/error";

import { getHttpEndPoint } from "./endPoints";
import { GameInfoData } from "@puzzlepop-client/types/base";

export const getRoomList = async (gameType: "cooperation" | "battle"): Promise<GameInfoData[]> => {
  const response = await fetch(`${getHttpEndPoint()}/game/rooms/${gameType}`);
  const data = (await response.json()) as GameInfoData[];
  return data;
};

export const postCreateRoom = async (props: {
  roomTitle: string;
  userId: string;
  roomSize: number;
  gameType: "COOPERATION" | "BATTLE";
}): Promise<GameInfoData> => {
  const { roomTitle, userId, roomSize: _roomSize, gameType } = props;
  const roomSize = Number(_roomSize);

  // 예외처리: 1인 ~ 8인 이하까지 가능
  if (roomSize < 1 || roomSize > 8) {
    throw new Error("방 크기는 1인 이상 8인 이하로 설정해야 합니다.");
  }

  const body = JSON.stringify({
    name: roomTitle,
    userid: userId,
    roomSize,
    type: "TEAM",
    gameType,
  });

  const response = await fetch(`${getHttpEndPoint()}/game/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
};

export const postEnterRoom = async (props: {
  userId: string;
  roomId: string;
}): Promise<GameInfoData> => {
  const { userId, roomId } = props;

  const body = JSON.stringify({
    id: userId,
  });

  const response = await fetch(`${getHttpEndPoint()}/game/room/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status === 400 || response.status === 403) {
    const errorText = await response.text();
    throw new RemoteError(errorText);
  }

  const data = await response.json();
  return data;
};
