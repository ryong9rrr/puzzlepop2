import { PropsWithChildren } from "react";
import { modalContainerStyle } from "./ModalContainer.css";

export const ModalContainer = ({ children }: PropsWithChildren) => {
  return <div className={modalContainerStyle}>{children}</div>;
};
