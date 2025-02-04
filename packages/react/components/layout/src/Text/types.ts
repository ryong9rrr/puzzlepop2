import { HTMLAttributes } from "react";
import { Typography } from "@puzzlepop2/themes";

export type TextProps = {
  size?: Typography;
  color?: string;
  bold?: boolean;
} & HTMLAttributes<HTMLSpanElement>;
