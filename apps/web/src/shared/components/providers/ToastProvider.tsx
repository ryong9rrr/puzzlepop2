"use client";

import { PropsWithChildren } from "react";
import { ToastProvider as _ToastProvider } from "@puzzlepop2/react-hooks-toast";

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return <_ToastProvider>{children}</_ToastProvider>;
};
