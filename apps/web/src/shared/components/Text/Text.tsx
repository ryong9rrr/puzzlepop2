import { HTMLAttributes } from "react";
import clsx from "clsx";
import { FoundationSize } from "@/theme/foundation/types";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: FoundationSize;
  color?: string;
}

export const Text = (props: TextProps) => {
  const { typography = "md", color, children, className, style, ...rest } = props;

  return (
    <span className={clsx(`text-${typography}`, className)} style={{ color, ...style }} {...rest}>
      {children}
    </span>
  );
};
