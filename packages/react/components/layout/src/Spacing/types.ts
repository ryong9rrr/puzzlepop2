import { CSSProperties } from "react";

export type SpacingProps = {
  size: number;
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  style?: CSSProperties;
};
