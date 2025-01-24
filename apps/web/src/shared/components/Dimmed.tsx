import { PropsWithChildren } from "react";
import styles from "./Dimmed.module.css";

export default function Dimmed({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
