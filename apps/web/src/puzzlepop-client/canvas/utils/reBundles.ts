import { Piece, TeamColor, Direction } from "../../types/base";
import { canvasStaticStore } from "../canvasStaticStore";
import { getNeighborPieceIndexMap } from "./getNeighborPieceIndexMap";
import { attachPieceToPiece } from "./attachPieceToPiece";

export const reBundles = (params: { bundles: Piece[][]; team: TeamColor }) => {
  const { bundles, team } = params;

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

  // 위치재조정, 번들 정보대로 그룹ID만 부여해서 그룹화
  bundles.forEach((bundle, newGroupId) => {
    reBundle({
      bundle,
      team,
      newGroupId,
    });
  });
};

const reBundle = (params: { bundle: Piece[]; team: TeamColor; newGroupId: number }) => {
  const { bundle, team, newGroupId } = params;

  const { redPieces, bluePieces } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  if (pieces.length === 0 || bundle.length === 0) {
    console.error("아직 pieces가 초기화되지 않았습니다.");
    return;
  }

  const targets = new Set<number>(bundle.map(piece => piece.index));
  const startPiece = bundle.pop()!;
  const visited = new Set<number>();

  const q = [startPiece.index];
  visited.add(startPiece.index);

  while (q.length > 0) {
    const pieceIndex = q.shift()!;

    // 상하좌우로 순회하면서 위치 재조정
    const neighborPieceIndexMap = getNeighborPieceIndexMap(pieceIndex);
    for (const _d of Object.keys(neighborPieceIndexMap)) {
      const direction = _d as Direction;
      const neighborIndex = neighborPieceIndexMap[direction];

      if (neighborIndex === null || visited.has(neighborIndex) || !targets.has(neighborIndex)) {
        continue;
      }

      visited.add(neighborIndex);
      attachPieceToPiece({
        pieceIndex: neighborIndex,
        toPieceIndex: pieceIndex,
        team,
        isSend: false,
      });
      q.push(neighborIndex);
    }
  }

  // 그룹ID 부여
  for (const pieceIndex of targets) {
    const piece = pieces[pieceIndex];
    piece.groupId = newGroupId;
  }
};
