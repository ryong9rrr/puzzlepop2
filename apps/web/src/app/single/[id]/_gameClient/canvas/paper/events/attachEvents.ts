import { getGameStore } from "../../../store";
import { onMouseDown } from "./onMouseDown/onMouseDown";
import { onMouseDrag } from "./onMouseDrag/onMouseDrag";
import { onMouseUp } from "./onMouseUp/onMouseUp";
import { onMouseEnter } from "./onMouseEnter/onMouseEnter";
import { onMouseLeave } from "./onMouseLeave/onMouseLeave";
import { CANVAS_ID } from "@puzzlepop2/game-core";

export const attachEvents = () => {
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;

  const { pieces } = getGameStore();

  pieces.forEach(paperPiece => {
    paperPiece.piece.onMouseDown = (event: paper.MouseEvent) => {
      if (canvasElement) {
        canvasElement.style.cursor = "auto";
      }

      onMouseDown({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseDrag = (event: paper.MouseEvent) => {
      if (canvasElement) {
        canvasElement.style.cursor = "grabbing";
      }

      onMouseDrag({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseUp = (event: paper.MouseEvent) => {
      if (canvasElement) {
        canvasElement.style.cursor = "auto";
      }

      onMouseUp({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseEnter = (event: paper.MouseEvent) => {
      if (canvasElement) {
        canvasElement.style.cursor = "grab";
      }

      onMouseEnter({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseLeave = (event: paper.MouseEvent) => {
      if (canvasElement) {
        canvasElement.style.cursor = "auto";
      }

      onMouseLeave({
        event,
        paperPiece,
      });
    };
  });
};
