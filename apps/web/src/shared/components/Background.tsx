import Image from "next/image";
import React, { CSSProperties, HTMLAttributes } from "react";

interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  opacity?: number;
}

export default function Background(props: BackgroundProps) {
  const { src, children, opacity = 0.4, style, ...rest } = props;

  return (
    <div style={{ ...style, ...containerStyle }} {...rest}>
      <Image style={{ ...imageStyles, opacity }} src={src} alt="" width={0} height={0} />
      {children}
    </div>
  );
}

const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyles: CSSProperties = {
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
