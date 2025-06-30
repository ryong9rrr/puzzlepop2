import { PropsWithChildren } from "react";

export default function Main(props: PropsWithChildren) {
  const { children } = props;

  return <main style={{ position: "relative" }}>{children}</main>;
}
