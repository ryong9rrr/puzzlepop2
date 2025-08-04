import { TeamColor } from "../../types/base";
import { canvasStaticStore } from "../canvasStaticStore";

// 한조각에 퍼즐에 이어진, 즉 한 그룹인 조각들을 찾아 배열로 반환하는 함수
export const getTargets = (pieceIndex: number, team: TeamColor) => {
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  const piece = pieces[pieceIndex];

  // 그룹이 없는 조각은 그 자체로 반환
  if (piece.groupId === null) {
    const { x, y } = piece.paperGroup.position;
    return [{ x, y, index: piece.index }];
  }

  const grouped = [];
  for (let index = 0; index < pieces.length; index += 1) {
    const anotherPiece = pieces[index];
    if (anotherPiece.groupId === piece.groupId) {
      const { x, y } = anotherPiece.paperGroup.position;
      grouped.push({ x, y, index });
    }
  }
  return grouped;
};
