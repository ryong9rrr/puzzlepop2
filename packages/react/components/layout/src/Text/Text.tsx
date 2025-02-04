import clsx from "clsx";
import { TextProps } from "./types";

export const Text = (props: TextProps) => {
  const { size = "md", className, children, color = "inherit", style, bold, ...rest } = props;

  return (
    <span
      className={clsx(`text-${size}`, className)}
      style={{ color: color, fontWeight: bold ? 800 : 400, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
};
