import { CanvasPiece, canvasStaticStore } from "../../canvasStaticStore";

export const onMouseDown = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const {
    initData: { me },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

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
