import { PropsWithChildren } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Flex, GridItem, Spacing } from "@puzzlepop2/react-components-layout";
import styles from "./style.module.css";

interface Props extends PropsWithChildren {
  imgSrc: string;
  onClick?: () => void;
  boxColor?: "lavender" | "yellow";
  disabled?: boolean;
}

export const CardItem = (props: Props) => {
  const { children, imgSrc, onClick, boxColor = "lavender", disabled } = props;

  const handleClickCard = () => {
    if (disabled) {
      return;
    }
    onClick?.();
  };

  return (
    <GridItem
      className={clsx(
        styles.hoverGrow,
        styles.box,
        styles[`box-${boxColor}`],
        disabled && styles["not-allowed"],
      )}
      onClick={handleClickCard}
    >
      <Flex direction="column" gapScale={0.4}>
        <div className={styles.imageContainer}>
          <Image src={imgSrc} alt="" fill sizes="25vw" className={styles.image} />
        </div>
        {children}
        <Spacing scale={0.1} />
      </Flex>
    </GridItem>
  );
};
