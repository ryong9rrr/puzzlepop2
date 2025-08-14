import { ComponentProps, CSSProperties } from "react";
import clsx from "clsx";
import { Text } from "@puzzlepop2/react-components-layout";

import * as styles from "./CardTitle.css";

type Size = ComponentProps<typeof Text>["size"];

interface Props {
  title: string;

  className?: string;
  size?: Size;
  style?: CSSProperties;
}

export const CardTitle = (props: Props) => {
  const { title, className, size, style } = props;

  return (
    <div className={clsx(styles.container, className)} style={{ ...style }}>
      <Text className={styles.text} size={size} bold>
        {title}
      </Text>
    </div>
  );
};
