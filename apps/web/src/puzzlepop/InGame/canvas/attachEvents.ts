import { canvasStaticStore } from "./canvasStaticStore";
import { onMouseDown } from "./events/onMouseDown/onMouseDown";
import { onMouseDrag } from "./events/onMouseDrag/onMouseDrag";
import { onMouseEnter } from "./events/onMouseEnter/onMouseEnter";
import { onMouseLeave } from "./events/onMouseLeave/onMouseLeave";
import { onMouseUp } from "./events/onMouseUp/onMouseUp";

export const attachEvents = () => {
  const {
    initData: { me },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  pieces.forEach(piece => {
    piece.paperGroup.onMouseDown = (event: paper.MouseEvent) => {
      onMouseDown(event, piece);
    };

    piece.paperGroup.onMouseDrag = (event: paper.MouseEvent) => {
      onMouseDrag(event, piece);
    };

    piece.paperGroup.onMouseUp = (event: paper.MouseEvent) => {
      onMouseUp(event, piece);
    };

    piece.paperGroup.onMouseEnter = (event: paper.MouseEvent) => {
      onMouseEnter(event, piece);
    };

    piece.paperGroup.onMouseLeave = (event: paper.MouseEvent) => {
      onMouseLeave(event, piece);
    };
  });
};
