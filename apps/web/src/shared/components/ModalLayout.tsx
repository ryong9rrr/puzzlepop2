import { PropsWithChildren } from "react";

import MODULE_CSS from "./ModalLayout.module.css";

export const ModalLayout = ({ children }: PropsWithChildren) => {
  return <div className={MODULE_CSS.container}>{children}</div>;
};
