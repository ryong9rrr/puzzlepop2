import { Piece, pieceStore } from "../../stores/pieceStore";

export const onMouseDown = (event: paper.MouseEvent, piece: Piece) => {
  const { pieces } = pieceStore.getState();

  if (piece.groupId === null) {
    event.target.bringToFront();
  } else {
    for (const anotherPiece of pieces) {
      if (anotherPiece.groupId === piece.groupId) {
        anotherPiece.paperGroup.bringToFront();
      }
    }
  }

  const puzzleUniqueId = event.target.id;

  console.log(piece);
  console.log(puzzleUniqueId);
  console.log(pieces);
};
