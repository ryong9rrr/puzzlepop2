"use client";

import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, IMG_ID } from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";

export const Canvas = () => {
  return (
    <>
      <img id={IMG_ID} alt="" style={{ display: "none" }} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          backgroundColor: vars.colors.grey[50],
          borderRadius: "0.25rem",
          opacity: 0.8,
          border: `3px solid ${vars.colors.grey[500]}`,
        }}
      />
    </>
  );
};
