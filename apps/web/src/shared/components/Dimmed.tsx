import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Dimmed.module.css";

export default function Dimmed(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...rest } = props;

  return (
    <div className={clsx(className, styles.container)} {...rest}>
      {children}
    </div>
  );
}
