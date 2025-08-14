"use client";

import { PropsWithChildren } from "react";
import { AlertProvider } from "@puzzlepop2/react-hooks-alert";

export const AlertServerProvider = ({ children }: PropsWithChildren) => {
  return <AlertProvider>{children}</AlertProvider>;
};
