"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Text } from "@puzzlepop2/react-components-layout";

interface ComboEffectProps {
  x: number;
  y: number;
  count: number;
}

export const ComboEffect = ({ x, y, count }: ComboEffectProps) => {
  return (
    <>
      <DotLottieReact
        src="/lotties/stars-spark.lottie"
        autoplay
        speed={2}
        style={{
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
          transform: "translate(-50%, -50%)",
          width: "5rem",
          height: "5rem",
          zIndex: 99,
          pointerEvents: "none",
        }}
      />
      {count > 0 && (
        <Text
          className="font-gameOutline animate__bounceIn animate__fadeOut"
          size="xs"
          bold
          color="orange"
          style={{
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            zIndex: 99,
            pointerEvents: "none",
          }}
        >
          {count} Combo
        </Text>
      )}
    </>
  );
};
