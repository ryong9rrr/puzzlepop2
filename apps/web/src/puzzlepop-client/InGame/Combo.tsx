"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Text } from "@puzzlepop2/react-components-layout";

import { useComboStore } from "../stores/useComboStore";

export const Combo = () => {
  const { combos } = useComboStore();

  return (
    <>
      {combos.map(({ id, x, y, count, visible }) => (
        <div key={id}>
          <DotLottieReact
            src="/lotties/combo.lottie"
            autoplay
            loop
            speed={1}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
              width: "5rem",
              height: "5rem",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {count > 0 && (
            <Text
              className={`font-gameInline animate__animated ${visible ? "animate__bounceIn" : "animate__fadeOutUp"}`}
              size="sm"
              bold
              color="orange"
              style={{
                position: "absolute",
                top: `${y}px`,
                left: `${x}px`,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {count} Combo
            </Text>
          )}
        </div>
      ))}
    </>
  );
};
