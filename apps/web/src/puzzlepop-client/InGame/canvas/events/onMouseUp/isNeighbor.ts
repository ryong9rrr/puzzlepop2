import { TeamColor } from "../../../../types/base";
import { canvasStaticStore } from "../../canvasStaticStore";
import { getNeighborPieceIndexMap } from "../../utils/getNeighborPieceIndexMap";

export const isNeighbor = (pieceIndex: number, toPieceIndex: number, team: TeamColor): boolean => {
  const {
    initData: { pieceSize },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  // 유효범위는 pieceSize의 30%
  const ERROR_RANGE = pieceSize * 0.3;

  const { left, right, top, bottom } = getNeighborPieceIndexMap(pieceIndex);

  const x = pieces[pieceIndex].paperGroup.position.x;
  const y = pieces[pieceIndex].paperGroup.position.y;

  if (left !== null && left === toPieceIndex) {
    const toPiece = pieces[left];
    return (
      Math.abs(x - pieceSize - toPiece.paperGroup.position.x) < ERROR_RANGE &&
      Math.abs(y - toPiece.paperGroup.position.y) < ERROR_RANGE
    );
  }

  if (right !== null && right === toPieceIndex) {
    const toPiece = pieces[right];
    return (
      Math.abs(toPiece.paperGroup.position.x - pieceSize - x) < ERROR_RANGE &&
      Math.abs(y - toPiece.paperGroup.position.y) < ERROR_RANGE
    );
  }

  if (top !== null && top === toPieceIndex) {
    const toPiece = pieces[top];
    return (
      Math.abs(toPiece.paperGroup.position.y + pieceSize - y) < ERROR_RANGE &&
      Math.abs(x - toPiece.paperGroup.position.x) < ERROR_RANGE
    );
  }

  if (bottom !== null && bottom === toPieceIndex) {
    const toPiece = pieces[bottom];
    return (
      Math.abs(y + pieceSize - toPiece.paperGroup.position.y) < ERROR_RANGE &&
      Math.abs(x - toPiece.paperGroup.position.x) < ERROR_RANGE
    );
  }

  return false;
};
