import { Piece, pieceStore } from "../../stores/pieceStore";

export const onMouseEnter = (event: paper.MouseEvent, piece: Piece) => {
  const { pieces } = pieceStore.getState();
};
