import { CANVAS_ID } from "../../constants";
import { CanvasPiece } from "../canvasStaticStore";

export const onMouseLeave = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const canvasElement = window.document.getElementById(CANVAS_ID);

  if (canvasElement) {
    (canvasElement as HTMLCanvasElement).style.cursor = "auto";
    return;
  }
};
