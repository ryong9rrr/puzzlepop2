"use client";

import { PropsWithChildren } from "react";
import { AlertProvider as _AlertProvider } from "@puzzlepop2/react-hooks-alert";

export const AlertProvider = ({ children }: PropsWithChildren) => {
  return <_AlertProvider>{children}</_AlertProvider>;
};
