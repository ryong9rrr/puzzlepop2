import { PropsWithChildren } from "react";

import MODULE_CSS from "./Main.module.css";
import clsx from "clsx";

export const Main = ({ children }: PropsWithChildren) => {
  return <main className={clsx(MODULE_CSS.main, MODULE_CSS["responsive-main"])}>{children}</main>;
};
