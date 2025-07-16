import { Piece, pieceStore } from "../../stores/pieceStore";

export const onMouseUp = (event: paper.MouseEvent, piece: Piece) => {
  const { pieces } = pieceStore.getState();
};
