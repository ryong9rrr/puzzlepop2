import { Piece, pieceStore } from "../../stores/pieceStore";

export const onMouseLeave = (event: paper.MouseEvent, piece: Piece) => {
  const { pieces } = pieceStore.getState();
};
