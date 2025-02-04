import { CSSProperties } from "react";
import { SpacingProps } from "./types";

export const Spacing = (props: SpacingProps) => {
  const { size, direction = "vertical", className, color, style, scale, ...rest } = props;

  const containerStyle: CSSProperties =
    direction === "vertical"
      ? { height: scale ? `${scale}rem` : size }
      : { width: scale ? `${scale}rem` : size };

  return (
    <div
      className={className}
      style={{ ...style, ...containerStyle, backgroundColor: color }}
      {...rest}
    />
  );
};
