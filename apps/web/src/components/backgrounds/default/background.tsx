"use client";

import Image from "next/image";
import { CSSProperties, useState } from "react";
import { Z_INDEX } from "@puzzlepop2/themes";
import { BackgroundProps } from "../types";

const defaultStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  objectFit: "cover",
  zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
};

export const Background = (props: BackgroundProps) => {
  const { src, blurSrc } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {blurSrc && (
        <Image
          src={blurSrc}
          alt="blur"
          fill
          priority
          style={{ ...defaultStyle, opacity: isLoaded ? 0 : 0.4 }}
        />
      )}

      <Image
        src={src}
        alt=""
        fill
        priority
        style={{
          ...defaultStyle,
          opacity: isLoaded ? 0.4 : 0,
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};
