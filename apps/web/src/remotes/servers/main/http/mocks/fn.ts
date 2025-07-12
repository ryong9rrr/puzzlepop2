import { CooperationWaitingGameData } from "@shared-types/multi";
import { sleep } from "@shared-utils/promises";

import { cooperationGameRoomList } from "./cooperation";

export const mockGetCooperationGameRoomList = async (): Promise<CooperationWaitingGameData[]> => {
  const data = await sleep(() => {
    return cooperationGameRoomList;
  }, 1000);

  return data;
};
