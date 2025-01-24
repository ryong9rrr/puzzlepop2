import { HTMLAttributes } from "react";
import clsx from "clsx";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: "sm" | "md" | "lg" | "xlg";
}

export default function Text(props: TextProps) {
  const { typography = "md", className, children, ...rest } = props;

  return (
    <span className={clsx(`responsive-text-${typography}`, className)} {...rest}>
      {children}
    </span>
  );
}
