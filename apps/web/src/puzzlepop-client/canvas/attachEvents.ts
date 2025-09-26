import { canvasStaticStore } from "./canvasStaticStore";

import { onMouseDown } from "./events/onMouseDown";
import { onMouseDrag } from "./events/onMouseDrag";
import { onMouseUp } from "./events/onMouseUp";

export const attachEvents = () => {
  const {
    initData: { me },
    redPieces,
    bluePieces,
    isLock,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  pieces.forEach(piece => {
    piece.paperGroup.onMouseDown = (event: paper.MouseEvent) => {
      if (isLock(me.team, piece.index)) {
        return;
      }

      onMouseDown(event, piece);
    };

    piece.paperGroup.onMouseDrag = (event: paper.MouseEvent) => {
      if (isLock(me.team, piece.index)) {
        return;
      }

      onMouseDrag(event, piece);
    };

    piece.paperGroup.onMouseUp = (event: paper.MouseEvent) => {
      if (isLock(me.team, piece.index)) {
        return;
      }

      onMouseUp(event, piece);
    };

    piece.paperGroup.onMouseEnter = () => {
      if (isLock(me.team, piece.index)) {
        window.document.body.style.cursor = "not-allowed";
      } else {
        window.document.body.style.cursor = "grab";
      }
    };

    piece.paperGroup.onMouseLeave = () => {
      window.document.body.style.cursor = "auto";
    };
  });
};
