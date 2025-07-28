"use client";

import { PropsWithChildren, useEffect } from "react";
import { vars } from "@puzzlepop2/themes";

import { useUserStore } from "./useUserStore";
import { getMultiGameStorage } from "./storage";

export const StorageGuard = ({ children }: PropsWithChildren) => {
  const me = useUserStore(state => state.me);
  const setMe = useUserStore(state => state.setMe);

  useEffect(() => {
    const storageMe = getMultiGameStorage().getItem();
    if (storageMe) {
      setMe(storageMe);
      return;
    }
  }, []);

  if (!me) {
    // TODO: Enter Room
    return (
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: vars.colors.black,
        }}
      />
    );
  }

  return <>{children}</>;
};
