"use client";

import { PropsWithChildren } from "react";
import { ToastProvider } from "@puzzlepop2/react-hooks-toast";

export const ToastClient = ({ children }: PropsWithChildren) => {
  return <ToastProvider>{children}</ToastProvider>;
};
