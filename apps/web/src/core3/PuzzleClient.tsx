import { vars } from "@puzzlepop2/themes";
import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, IMG_ID } from "@puzzlepop2/game-core";
import { PuzzleLoader } from "./PuzzleLoader";
import { PuzzleEngineProps } from "./engine/types";

export const PuzzleClient = (props: PuzzleEngineProps) => {
  return (
    <>
      <img id={IMG_ID} src={props.src} style={{ display: "none" }} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          backgroundColor: vars.colors.grey["200"],
        }}
      ></canvas>
      <PuzzleLoader {...props} />
    </>
  );
};
