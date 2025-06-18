import clsx from "clsx";
import { container } from "./style.css";
import { HTMLAttributes } from "react";

export const Dimmed = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, children, ...rest } = props;

  return (
    <div className={clsx(container, className)} {...rest}>
      {children}
    </div>
  );
};
