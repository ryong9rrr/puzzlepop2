"use client";

import React, { CSSProperties } from "react";
import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

interface Props {
  percent: number; // 0~100
  color?: keyof typeof vars.colors;
}

const HEIGHT_PX = 40;

export const ProgressBar = ({ percent: _percent, color = "orange" }: Props) => {
  const fillUpMinColor = `var(--${color}-500)`;
  const fillDownMinColor = `var(--${color}-600)`;
  const fillUpMaxColor = `var(--${color}-100)`;
  const fillDownMaxColor = `var(--${color}-200)`;
  const glowColor = `var(--${color}-100)`;

  const percent = Math.floor(Math.max(0, Math.min(100, _percent)));

  const fillStyle: CSSProperties = {
    width: `${percent}%`,
    height: `${Math.floor(HEIGHT_PX / 2)}px`,
    transition: "width 0.6s ease",
    position: "relative",
    zIndex: 1,
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
      }}
    >
      <Flex
        direction="column"
        justify="center"
        style={{
          padding: "4px",
          width: "100%",
          height: `${HEIGHT_PX}px`,
          backgroundColor: vars.colors.grey[800],
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
          position: "relative",
        }}
      >
        <div
          style={{
            ...fillStyle,
            backgroundImage: `linear-gradient(to right, ${fillUpMinColor}, ${fillUpMaxColor})`,
            borderRadius: "4px 4px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: `${percent}%`,
            height: "100%",
            background: `radial-gradient(circle at 90% center, ${glowColor} 0%, transparent 20%)`,
            filter: "blur(12px)",
            opacity: 0.8,
            pointerEvents: "none",
            transition: "width 0.6s ease",
          }}
        />
        <div
          style={{
            ...fillStyle,
            backgroundImage: `linear-gradient(to right, ${fillDownMinColor}, ${fillDownMaxColor})`,
            borderRadius: "0 0 4px 4px",
          }}
        />
        <Text
          className="font-gameOutline"
          size="sm"
          bold
          color={percent > 50 ? vars.colors.black : vars.colors.white}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          {percent}%
        </Text>
      </Flex>
    </div>
  );
};
