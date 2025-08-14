import { PropsWithChildren, CSSProperties } from "react";
import clsx from "clsx";
import { Flex, GridItem } from "@puzzlepop2/react-components-layout";

import * as styles from "./CardGridItem.css";

interface Props extends PropsWithChildren {
  color?: "lavender" | "yellow";
  disabled?: boolean;
  onClick?: () => void;

  className?: string;
  style?: CSSProperties;
}

export const CardGridItem = (props: Props) => {
  const { color, disabled, children, onClick, className = "", style = {} } = props;

  return (
    <GridItem
      className={clsx(
        styles.container,
        color && `box-${color}`,
        disabled && styles.notAllowed,
        className,
      )}
      onClick={onClick}
      style={{ ...style }}
    >
      <Flex
        direction="column"
        gapScale={0.4}
        style={{
          flex: 1,
        }}
      >
        {children}
      </Flex>
    </GridItem>
  );
};
