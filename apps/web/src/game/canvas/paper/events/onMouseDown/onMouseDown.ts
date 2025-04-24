import { getGameStore } from "@/game/store";
import { OnMouseEventType } from "../types";

export const onMouseDown = (props: OnMouseEventType) => {
  const { event, paperPiece } = props;

  const { pieces } = getGameStore();

  if (paperPiece.groupId === null) {
    event.target.bringToFront();
    return;
  }

  pieces
    .filter(anotherPaperPiece => anotherPaperPiece.groupId === paperPiece.groupId)
    .forEach(anotherPaperPiece => {
      anotherPaperPiece.piece.bringToFront();
    });
};
