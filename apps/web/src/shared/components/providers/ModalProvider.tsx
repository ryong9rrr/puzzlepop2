"use client";

import { PropsWithChildren } from "react";
import { ModalProvider as _ModalProvider } from "@puzzlepop2/react-hooks-modal";

export const ModalProvider = ({ children }: PropsWithChildren) => {
  return <_ModalProvider>{children}</_ModalProvider>;
};
