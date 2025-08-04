"use client";

import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { useInGameUIStore } from "../stores/useInGameUIStore";

export const Timer = () => {
  const time = useInGameUIStore(state => state.time);

  const HHMMSS = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Flex
      className="font-gameInline"
      justify="center"
      align="center"
      style={{
        position: "absolute",
        top: "4px",
        right: "4px",
        border: `4px solid ${vars.colors.orange[200]}`,
        color: vars.colors.grey[800],
        width: "4rem",
        borderRadius: "0.25rem",
        backgroundColor: vars.colors.grey[50],
        backdropFilter: "blur(5px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: "0.5rem 0.5rem 0.4rem 0.5rem",
        zIndex: 1000,
      }}
    >
      <Text bold>{HHMMSS(time)}</Text>
    </Flex>
  );
};
