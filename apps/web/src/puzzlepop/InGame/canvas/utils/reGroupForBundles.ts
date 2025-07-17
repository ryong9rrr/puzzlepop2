import { Piece, TeamColor } from "../../../types/base";
import { canvasStaticStore } from "../canvasStaticStore";

export const reGroupForBundles = (bundles: Piece[][], team: TeamColor) => {
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  if (pieces.length === 0) {
    console.error("아직 pieces가 초기화되지 않았습니다.");
    return;
  }

  // 일단 모든 피스 그룹해제
  for (const piece of pieces) {
    piece.groupId = null;
  }

  // 번들 정보대로 그룹ID만 부여해서 그룹화 (위치는 건드리지 않음)
  bundles.forEach((bundle, newGroupId) => {
    for (const { index } of bundle) {
      const piece = pieces[index];
      piece.groupId = newGroupId;
    }
  });
};
