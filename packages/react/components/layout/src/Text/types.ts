import { HTMLAttributes } from "react";
import { FoundationSize } from "@puzzlepop2/themes";

export type TextProps = {
  size?: FoundationSize;
  color?: string;
} & HTMLAttributes<HTMLSpanElement>;
