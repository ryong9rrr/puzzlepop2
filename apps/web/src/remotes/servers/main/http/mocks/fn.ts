import { GameData } from "@shared-types/multi";
import { sleep } from "@shared-utils/sleep";

import { cooperationGameRoomList } from "./cooperation";

export const mockGetCooperationGameRoomList = async (): Promise<GameData[]> => {
  const data = await sleep(() => {
    return cooperationGameRoomList;
  }, 1000);

  return data;
};
