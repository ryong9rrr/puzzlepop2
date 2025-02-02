import clsx from "clsx";
import { FoundationSize } from "@puzzlepop2/themes";

export type TextProps = {
  size?: FoundationSize;
  color?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const Text = (props: TextProps) => {
  const { size = "md", className, children, color = "inherit", style, ...rest } = props;

  return (
    <span className={clsx(`text-${size}`, className)} style={{ color: color, ...style }} {...rest}>
      {children}
    </span>
  );
};
