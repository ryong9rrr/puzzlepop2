import { RemoteError } from "@shared-utils/error";

import { getHttpEndPoint } from "./endPoints";
import { GameInfoData } from "@puzzlepop-client/types/base";

export const getRoomList = async (gameType: "cooperation" | "battle"): Promise<GameInfoData[]> => {
  const response = await fetch(`${getHttpEndPoint()}/game/rooms/${gameType}`);
  const data = (await response.json()) as GameInfoData[];
  return [...data, gameInfoDataSample1, gameInfoDataSample2];
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

const gameInfoDataSample1 = {
  admin: {
    id: "룡구르르",
    member: false,
    sessionId: "",
  },
  gameName: "치이카와 귀여워",
  gameId: "sample1",
  started: true,
  redTeam: {
    players: [{ id: "red_player_1" }, { id: "룡구르르" }],
  },
  roomSize: 3,
  picture: {
    encodedString:
      "https://puzzlepop.site/cdn/bdfbb0f7-c8ea-4104-b3d6-bcf0e21468ea1747680621120/origin.webp",
  },
} as GameInfoData;

const gameInfoDataSample2 = {
  admin: {
    id: "송태섭",
    member: false,
    sessionId: "",
  },
  gameName: "왼손은 거들뿐...",
  gameId: "sample2",
  started: true,
  redTeam: {
    players: [{ id: "송태섭" }],
  },
  roomSize: 1,
  picture: {
    encodedString:
      "https://puzzlepop.site/cdn/516ae116-8596-4f74-94c9-ca60d49e417c1747677367656/origin.webp",
  },
} as GameInfoData;
