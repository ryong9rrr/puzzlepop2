import { PropsWithChildren } from "react";

export const Main = (props: PropsWithChildren) => {
  const { children } = props;

  return <main style={{ position: "relative" }}>{children}</main>;
};
