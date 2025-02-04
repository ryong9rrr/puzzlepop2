import clsx from "clsx";
import { container } from "./style.css";
import { DimmedProps } from "./types";

export const Dimmed = (props: DimmedProps) => {
  const { className, children } = props;

  return <div className={clsx(container, className)}>{children}</div>;
};
