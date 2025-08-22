import { PropsWithChildren } from "react";
import MODULE_CSS from "./CardGridLayout.module.css";

export const CardGridLayout = ({ children }: PropsWithChildren) => {
  return <section className={MODULE_CSS["grid-layout"]}>{children}</section>;
};
