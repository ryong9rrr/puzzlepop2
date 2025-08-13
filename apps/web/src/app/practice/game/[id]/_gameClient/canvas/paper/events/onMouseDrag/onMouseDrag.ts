import Paper from "paper";

import { getGameStore } from "../../../../store";
import { OnMouseEventType } from "../types";

export const onMouseDrag = (props: OnMouseEventType) => {
  const { event, paperPiece } = props;

  const { pieceSize, pieces } = getGameStore();

  const px = paperPiece.piece.position.x;
  const py = paperPiece.piece.position.y;

  const nx = Math.min(
    Math.max(paperPiece.piece.position.x + event.delta.x, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.width - Math.floor(pieceSize / 2),
  );
  const ny = Math.min(
    Math.max(paperPiece.piece.position.y + event.delta.y, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.height - Math.floor(pieceSize / 2),
  );

  if (paperPiece.groupId === null) {
    paperPiece.piece.position = new Paper.Point(nx, ny);
    return;
  }

  pieces
    .filter(anotherPaperPiece => anotherPaperPiece.groupId === paperPiece.groupId)
    .forEach(anotherPaperPiece => {
      anotherPaperPiece.piece.position = new Paper.Point(
        anotherPaperPiece.piece.position.x + nx - px,
        anotherPaperPiece.piece.position.y + ny - py,
      );
    });
};
