"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const LottieNewLabel = () => {
  return (
    <div style={{ position: "relative" }}>
      <DotLottieReact
        src="/lotties/new-label.lottie"
        autoplay
        loop
        style={{
          position: "absolute",
          top: "-1.5rem",
          left: "-1.5rem",
          width: "6rem",
          height: "3rem",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
