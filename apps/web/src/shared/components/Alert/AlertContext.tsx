import { createContext } from "react";

export type AlertProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  onCloseAfter?: () => void | Promise<void>;
};

export type AlertContextType = {
  isShowAlert: boolean;
  alert: (alertProps: AlertProps) => void;
};

export const AlertContext = createContext<AlertContextType>({
  isShowAlert: false,
  alert: () => {},
});
