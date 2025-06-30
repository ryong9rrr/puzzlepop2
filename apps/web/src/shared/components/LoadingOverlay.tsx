"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Flex } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import * as CDN from "@remotes-cdn/images";

interface Props {
  isLoadingComplete: boolean;
}

const SECOND = 1;

export const LoadingOverlay = ({ isLoadingComplete }: Props) => {
  const [hide, setHide] = useState(false);

  // 로딩이 완료된 이후 SECOND 초 동안 천천히 사라짐
  useEffect(() => {
    if (isLoadingComplete) {
      const timer = setTimeout(() => {
        setHide(true);
      }, SECOND * 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete]);

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        backgroundColor: vars.colors.grey[900],
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        visibility: hide ? "hidden" : "visible",
        opacity: isLoadingComplete ? 0 : 1,
        transition: `opacity ${SECOND}s ease-in-out`,
        pointerEvents: isLoadingComplete ? "none" : "auto",
      }}
    >
      <Image
        src={CDN.LOADING_PUZZLE}
        alt=""
        priority
        width={600}
        height={400}
        style={{ objectFit: "cover" }}
      />
    </Flex>
  );
};
