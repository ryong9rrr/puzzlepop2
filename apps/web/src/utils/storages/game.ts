import { Storage } from "./storage";
import { COOPERATION_USER_KEY } from "./keys";

type User = {
  id: string;
  team: "RED" | "BLUE";
};

class CooperationGameStorage extends Storage<User> {
  constructor() {
    super({
      key: COOPERATION_USER_KEY,
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

let cooperationGameStorage: CooperationGameStorage;
const getCooperationGameStorage = () => {
  if (typeof window === "undefined") {
    throw new Error("CooperationGameStorage can only be used in the browser.");
  }
  if (!cooperationGameStorage) {
    cooperationGameStorage = new CooperationGameStorage();
  }
  return cooperationGameStorage;
};

export { getCooperationGameStorage };
