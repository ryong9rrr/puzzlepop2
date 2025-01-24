import Image from "next/image";
import React, { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Background.module.css";

interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  opacity?: number;
}

export default function Background(props: BackgroundProps) {
  const { src, children, opacity = 0.4, className, ...rest } = props;

  return (
    <div className={clsx(className, styles.container)} {...rest}>
      <Image style={{ ...imageStyle, opacity }} src={src} alt="" width={0} height={0} />
      {children}
    </div>
  );
}

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
