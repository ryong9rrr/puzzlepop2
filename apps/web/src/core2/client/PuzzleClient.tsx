import { CSSProperties } from "react";
import { vars } from "@puzzlepop2/themes";
import { IMG_ID, CANVAS_ID } from "../dom";
import { PuzzleCanvas } from "./PuzzleCanvas";

type PuzzleClientProps = {
  src: string;
};

export const PuzzleClient = (props: PuzzleClientProps) => {
  const { src } = props;

  return (
    <>
      <img id={IMG_ID} alt="" src={src} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: "1000px",
          height: "750px",
          backgroundColor: vars.colors.grey[200],
        }}
      />
      <PuzzleCanvas />
    </>
  );
};
