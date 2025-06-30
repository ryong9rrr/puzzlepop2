import { AbstractStorage } from "./AbstractStorage";

export const createStorage = <T>(extendedStorageClass: new () => AbstractStorage<T>) => {
  let storageInstance: AbstractStorage<T> | null = null;

  const getStorage = () => {
    if (typeof window === "undefined") {
      throw new Error(`${extendedStorageClass.name} can only be used in the browser.`);
    }
    if (!storageInstance) {
      storageInstance = new extendedStorageClass();
    }
    return storageInstance;
  };

  return { getStorage };
};
