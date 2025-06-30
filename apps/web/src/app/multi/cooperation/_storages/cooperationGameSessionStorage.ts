import { AbstractStorage } from "@shared-storages/AbstractStorage";
import { createStorage } from "@shared-storages/createStorage";

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

  validate(parsedData: any): boolean {
    return (
      parsedData.id &&
      parsedData.team &&
      typeof parsedData.id === "string" &&
      ["RED", "BLUE"].includes(parsedData.team)
    );
  }
}

const { getStorage } = createStorage(CooperationGameSessionStorage);
export const getCooperationGameSessionStorage = getStorage;
