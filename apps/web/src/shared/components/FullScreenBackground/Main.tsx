import { CSSProperties, PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return <main style={containerStyle}>{children}</main>;
}

const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};
