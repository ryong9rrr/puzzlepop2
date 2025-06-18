import { getOriginServerUrl } from "../end-points";
import { MultiGameRoom } from "./types";

export const getCooperationGameRoomList = async (): Promise<MultiGameRoom[]> => {
  const response = await fetch(`${getOriginServerUrl()}/game/rooms/cooperation`);
  const data = await response.json();
  return data;
};

export const createCooperationGameRoom = async (props: {
  roomTitle: string;
  userId: string;
  roomSize: number;
}): Promise<MultiGameRoom> => {
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

  const response = await fetch(`${getOriginServerUrl()}/game/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
};
