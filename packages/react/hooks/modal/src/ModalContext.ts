import { createContext } from "react";
import { ModalContextType } from "./types";

export const ModalContext = createContext<ModalContextType>({
  isShowModal: false,
  open: () => {},
  close: () => {},
});
