import { PropsWithChildren } from "react";
import clsx from "clsx";
import { container } from "./style.css";

export type DimmedProps = {
  className?: string;
} & PropsWithChildren;

export const Dimmed = (props: DimmedProps) => {
  const { className, children } = props;

  return <div className={clsx(container, className)}>{children}</div>;
};
