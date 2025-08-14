import Image from "next/image";
import { CSSProperties } from "react";

import { Skeleton } from "@puzzlepop2/react-components-layout";

export const CardImage = ({ src }: { src: string }) => {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16/9",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        unoptimized
        style={{
          ...baseImageStyle,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export const CardImageSkeleton = () => {
  return (
    <Skeleton
      style={{
        ...baseImageStyle,
        width: "100%",
        aspectRatio: "16/9",
      }}
    />
  );
};

const baseImageStyle: CSSProperties = {
  borderRadius: "0.4rem",
  pointerEvents: "none",
};
