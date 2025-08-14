"use client";

import Image from "next/image";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { useInGameUIStore } from "../stores/useInGameUIStore";

export const ExampleImage = () => {
  const inGameUIImgSrc = useInGameUIStore(state => state.imgSrc);

  if (!inGameUIImgSrc) {
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
      <Flex direction="column" justify="center" align="center">
        <Text
          bold
          size="xs"
          color="green"
          style={{
            padding: "4px",
            borderRadius: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            pointerEvents: "none",
          }}
        >
          이 그림을 맞춰주세요!
        </Text>
        <Spacing size={8} />
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
      </Flex>
    </div>
  );
};
