import Image from "next/image";
import React, { CSSProperties } from "react";
import clsx from "clsx";
import { Box, BoxProps } from "@puzzlepop2/react";
import styles from "./Background.module.css";

interface BackgroundProps extends BoxProps {
  src: string;
  opacity?: number;
  unoptimized?: boolean;
}

export const Background = (props: BackgroundProps) => {
  const { src, children, opacity = 0.4, unoptimized = false, className, ...rest } = props;

  return (
    <Box className={clsx(className, styles.container)} {...rest}>
      <Image
        style={{ ...imageStyle, opacity }}
        src={src}
        alt=""
        width={0}
        height={0}
        unoptimized={unoptimized}
      />
      {children}
    </Box>
  );
};

const imageStyle: CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: "cover",
  zIndex: "var(--background-zindex)",
};
