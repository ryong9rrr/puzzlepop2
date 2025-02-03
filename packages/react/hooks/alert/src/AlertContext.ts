import { createContext } from "react";
import { AlertContextType } from "./types";

export const AlertContext = createContext<AlertContextType>({
  isShowAlert: false,
  alert: () => {},
});
