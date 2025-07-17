import { MeFromStorage } from "@puzzlepop2/game-core";
import { AbstractStorage } from "@shared-storages/AbstractStorage";
import { createStorage } from "@shared-storages/createStorage";
import { isRecord } from "./typeUtils";

class MultiGameStorage extends AbstractStorage<MeFromStorage> {
  constructor() {
    super({
      key: "COOPERATION_USER_KEY",
      type: "session",
    });
  }

  validate(parsedData: unknown): parsedData is MeFromStorage {
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

const { getStorage } = createStorage(MultiGameStorage);
export const getMultiGameStorage = getStorage;
