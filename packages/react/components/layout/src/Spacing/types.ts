import { CSSProperties } from "react";

type BaseProps = {
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  style?: CSSProperties;
};
type SizeOnly = BaseProps & { size: number; scale?: never };
type ScaleOnly = BaseProps & { scale: number; size?: never };

export type SpacingProps = SizeOnly | ScaleOnly;
