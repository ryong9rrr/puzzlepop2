import { CSSProperties, ReactNode } from "react";

export type ToastPayload = {
  message: ReactNode;
};

export type ToastConfig = {
  payload: ToastPayload;

  duration?: number;
  className?: string;
  style?: CSSProperties;
};

export type ToastContextProps = {
  toast: (toastConfig: ToastConfig) => void;
};
