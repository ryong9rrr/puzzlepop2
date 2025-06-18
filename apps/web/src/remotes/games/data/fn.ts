import { sleep } from "@/utils/sleep";
import { cooperationGameRoomList } from "./cooperation";
import { MultiGameRoom } from "../types";

export const mockGetCooperationGameRoomList = async (): Promise<MultiGameRoom[]> => {
  const data = await sleep(() => {
    return cooperationGameRoomList;
  }, 1000);

  return data;
};
