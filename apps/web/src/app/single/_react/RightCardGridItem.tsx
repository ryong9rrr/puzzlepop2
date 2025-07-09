import { PropsWithChildren } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Flex, GridItem, Spacing } from "@puzzlepop2/react-components-layout";

import MODULE_CSS from "./RightCard.module.css";

interface Props extends PropsWithChildren {
  imgSrc: string;
  onClick?: () => void;
  boxColor?: "lavender" | "yellow";
  disabled?: boolean;
}

export const RightCardGridItem = (props: Props) => {
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
        MODULE_CSS.hoverGrow,
        MODULE_CSS.box,
        MODULE_CSS[`box-${boxColor}`],
        disabled && MODULE_CSS["not-allowed"],
      )}
      onClick={handleClickCard}
    >
      <Flex direction="column" gapScale={0.4}>
        <div className={MODULE_CSS.imageContainer}>
          <Image src={imgSrc} alt="" fill sizes="25vw" className={MODULE_CSS.image} />
        </div>
        {children}
        <Spacing scale={0.1} />
      </Flex>
    </GridItem>
  );
};
