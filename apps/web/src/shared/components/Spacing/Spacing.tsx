import { CSSProperties } from "react";

interface SpacingProps {
  size: number;
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  style?: CSSProperties;
}

export const Spacing = (props: SpacingProps) => {
  const { size, direction = "vertical", className, color, style } = props;

  const containerStyle: CSSProperties =
    direction === "vertical" ? { height: size } : { width: size };

  return (
    <div className={className} style={{ ...containerStyle, backgroundColor: color, ...style }} />
  );
};
