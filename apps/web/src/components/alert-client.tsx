"use client";

import { AlertProvider } from "@puzzlepop2/react-hooks-alert";
import { PropsWithChildren } from "react";

export const AlertClient = ({ children }: PropsWithChildren) => {
  return <AlertProvider>{children}</AlertProvider>;
};
