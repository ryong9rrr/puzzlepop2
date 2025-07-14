import { CooperationWaitingGameData } from "@puzzlepop2/game-core";
import { RemoteError } from "@shared-utils/error";

import { ORIGINAL_SERVER_END_POINT_HTTP } from "../_ep";
import { cooperationGameSamples } from "./mocks/cooperation";

export const getCooperationGameRoomList = async (): Promise<CooperationWaitingGameData[]> => {
  const response = await fetch(`${ORIGINAL_SERVER_END_POINT_HTTP()}/game/rooms/cooperation`);
  const data = (await response.json()) as CooperationWaitingGameData[];
  return [...data, ...cooperationGameSamples]; // 허전하니까 일부러 샘플 넣어놓음
};

export const createGameRoom = async (props: {
  roomTitle: string;
  userId: string;
  roomSize: number;
}): Promise<CooperationWaitingGameData> => {
  const { roomTitle, userId, roomSize: _roomSize } = props;
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
    gameType: "COOPERATION",
  });

  const response = await fetch(`${ORIGINAL_SERVER_END_POINT_HTTP()}/game/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
};

export const enterGameRoom = async (props: {
  userId: string;
  roomId: string;
}): Promise<CooperationWaitingGameData> => {
  const { userId, roomId } = props;

  const body = JSON.stringify({
    id: userId,
  });

  const response = await fetch(`${ORIGINAL_SERVER_END_POINT_HTTP()}/game/room/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status === 400) {
    throw new RemoteError("다른 닉네임을 사용해주세요.");
  }

  if (response.status === 403) {
    throw new RemoteError("정원이 가득 찼어요.");
  }

  const data = await response.json();
  return data;
};
