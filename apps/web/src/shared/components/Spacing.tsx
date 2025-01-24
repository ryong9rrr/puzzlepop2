import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";

interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  direction?: "horizontal" | "vertical";
}

export default function Spacing(props: SpacingProps) {
  const { size, direction = "vertical", className, ...rest } = props;

  const containerStyles: CSSProperties =
    direction === "vertical" ? { height: size } : { width: size };

  return <div className={clsx(className)} style={{ ...containerStyles }} {...rest} />;
}
