import clsx from "clsx";
import { TextProps } from "./types";

export const Text = (props: TextProps) => {
  const { size = "md", className, children, color = "inherit", style, ...rest } = props;

  return (
    <span className={clsx(`text-${size}`, className)} style={{ color: color, ...style }} {...rest}>
      {children}
    </span>
  );
};
