import { CSSProperties } from "react";
import { SpacingProps } from "./types";

export const Spacing = (props: SpacingProps) => {
  const { size, direction = "vertical", className, color, style } = props;

  const containerStyle: CSSProperties =
    direction === "vertical" ? { height: size } : { width: size };

  return (
    <div className={className} style={{ ...style, ...containerStyle, backgroundColor: color }} />
  );
};
