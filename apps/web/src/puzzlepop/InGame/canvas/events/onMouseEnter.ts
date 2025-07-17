import * as Paper from "paper";
import { CANVAS_ID } from "@puzzlepop2/game-core";
import { CanvasPiece } from "../canvasStaticStore";

export const onMouseEnter = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const canvasElement = window.document.getElementById(CANVAS_ID);

  if (canvasElement) {
    (canvasElement as HTMLCanvasElement).style.cursor = "pointer";
    return;
  }

  // piece.paperGroup.strokeColor = new Paper.Color("grey");
  // piece.paperGroup.strokeWidth = 4;
};
