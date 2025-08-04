import { CanvasPiece } from "../../canvasStaticStore";

import { moveOnePiece } from "./moveOnePiece";
import { moveGroupPiece } from "./moveGroupPiece";

export const onMouseUp = (event: paper.MouseEvent, piece: CanvasPiece) => {
  // 1) 피스 1개만 옮긴 경우
  if (piece.groupId === null) {
    moveOnePiece(piece);
    return;
  }

  // 2) 그룹피스를 옮긴 경우
  moveGroupPiece(piece);
};
