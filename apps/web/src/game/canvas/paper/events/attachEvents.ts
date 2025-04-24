import { getGameStore } from "@/game/store";
import { onMouseDown } from "./onMouseDown/onMouseDown";
import { onMouseDrag } from "./onMouseDrag/onMouseDrag";
import { onMouseUp } from "./onMouseUp/onMouseUp";
import { onMouseEnter } from "./onMouseEnter/onMouseEnter";
import { onMouseLeave } from "./onMouseLeave/onMouseLeave";

export const attachEvents = () => {
  const { pieces } = getGameStore();

  pieces.forEach(paperPiece => {
    paperPiece.piece.onMouseDown = (event: paper.MouseEvent) => {
      onMouseDown({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseDrag = (event: paper.MouseEvent) => {
      onMouseDrag({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseUp = (event: paper.MouseEvent) => {
      onMouseUp({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseEnter = (event: paper.MouseEvent) => {
      onMouseEnter({
        event,
        paperPiece,
      });
    };

    paperPiece.piece.onMouseLeave = (event: paper.MouseEvent) => {
      onMouseLeave({
        event,
        paperPiece,
      });
    };
  });
};
