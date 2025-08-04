"use client";

import Image from "next/image";
import { vars } from "@puzzlepop2/themes";

import { useInGameUIStore } from "./useInGameUIStore";
import { useSideWidgetStore } from "./useSideWidgetStore";

export const ExampleImage = () => {
  const isActiveExampleImage = useSideWidgetStore(state => state.isActiveExampleImage);
  const inGameUIImgSrc = useInGameUIStore(state => state.imgSrc);

  if (!inGameUIImgSrc || !isActiveExampleImage) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
      }}
    >
      <Image
        src={inGameUIImgSrc}
        alt=""
        width={300}
        height={200}
        priority
        style={{
          objectFit: "cover",
          border: `3px solid ${vars.colors.grey[100]}`,
          borderRadius: "0.25rem",
          pointerEvents: "none",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};
