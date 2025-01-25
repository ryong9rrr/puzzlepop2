import { PropsWithChildren } from "react";
import styles from "./Dimmed.module.css";

export const Dimmed = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};
