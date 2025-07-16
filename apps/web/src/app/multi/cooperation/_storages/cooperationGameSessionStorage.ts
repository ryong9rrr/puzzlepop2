import { AbstractStorage } from "@shared-storages/AbstractStorage";
import { createStorage } from "@shared-storages/createStorage";
import { isRecord } from "@shared-types/utils";

type User = {
  id: string;
  team: "RED" | "BLUE";
};

class CooperationGameSessionStorage extends AbstractStorage<User> {
  constructor() {
    super({
      key: "COOPERATION_USER_KEY",
      type: "session",
    });
  }

  validate(parsedData: unknown): parsedData is User {
    if (!parsedData || !isRecord(parsedData)) {
      return false;
    }

    if (!("id" in parsedData) || !("team" in parsedData)) {
      return false;
    }

    if (typeof parsedData.id !== "string" || typeof parsedData.team !== "string") {
      return false;
    }

    if (!["RED", "BLUE"].includes(parsedData.team)) {
      return false;
    }

    return true;
  }
}

const { getStorage } = createStorage(CooperationGameSessionStorage);
export const getCooperationGameSessionStorage = getStorage;
