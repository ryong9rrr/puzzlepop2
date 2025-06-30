"use client";

import Image from "next/image";
import { CSSProperties, useState } from "react";
import { Z_INDEX } from "@puzzlepop2/themes";

interface Props {
  src: string;
  blurSrc?: string;
}

const stickyStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100vh",
  objectFit: "cover",
  zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
};

export default function Background(props: Props) {
  const { src, blurSrc } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {blurSrc && (
        <Image
          src={blurSrc}
          alt=""
          priority
          width={2440}
          height={1480}
          style={{ ...stickyStyle, opacity: isLoaded ? 0 : 0.4 }}
        />
      )}

      <Image
        src={src}
        alt=""
        priority
        width={2440}
        height={1480}
        style={{ ...stickyStyle, opacity: isLoaded ? 0.4 : 0 }}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}
