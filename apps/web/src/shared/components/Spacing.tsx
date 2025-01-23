import { CSSProperties } from "react";

interface SpacingProps {
  size: number;
  direction?: "horizontal" | "vertical";
}

export default function Spacing(props: SpacingProps) {
  const { size, direction = "vertical" } = props;

  const containerStyles: CSSProperties =
    direction === "vertical" ? { height: size } : { width: size };

  return <div style={{ ...containerStyles }} />;
}
