import { PropsWithChildren } from "react";
import { alertContainerStyle } from "./AlertContainer.css";

export const AlertContainer = ({ children }: PropsWithChildren) => {
  return <div className={alertContainerStyle}>{children}</div>;
};
