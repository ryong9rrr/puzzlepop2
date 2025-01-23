import { CSSProperties, PropsWithChildren } from "react";

export default function Dimmed({ children }: PropsWithChildren) {
  return <div style={{ ...containerStyles }}>{children}</div>;
}

const containerStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: "var(--dimmed-zindex)",
};
