import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return <main style={{ position: "relative" }}>{children}</main>;
}
