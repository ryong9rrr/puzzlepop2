"use client";

import { PropsWithChildren } from "react";
import { ModalProvider } from "@puzzlepop2/react-hooks-modal";

export const ModalClient = ({ children }: PropsWithChildren) => {
  return <ModalProvider>{children}</ModalProvider>;
};
