import { Direction } from "@puzzlepop2/game-core";

import { CanvasPiece, canvasStaticStore } from "../../canvasStaticStore";

import { getNeighborPieceIndexMap } from "../../utils/getNeighborPieceIndexMap";
import { getMaxGroupId } from "../../utils/getMaxGroupId";
import { attachPieceToPiece } from "../../utils/attachPieceToPiece";

import { isInValidRange } from "./isInValidRange";

export const moveOnePiece = (piece: CanvasPiece) => {
  const {
    initData: { me },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  // 좌상우하 모두 확인
  const neighborPieceIndexMap = getNeighborPieceIndexMap(piece.index);

  for (const _d of Object.keys(neighborPieceIndexMap)) {
    const direction = _d as Direction;
    const neighborPieceIndex = neighborPieceIndexMap[direction];

    // 테두리라면 pass
    if (neighborPieceIndex === null) {
      continue;
    }

    // 범위내에 없다면 pass
    if (!isInValidRange(piece.index, neighborPieceIndex, me.team)) {
      continue;
    }

    // 이미 같은 그룹이 되었다면 pass
    if (piece.groupId !== null && piece.groupId === pieces[neighborPieceIndex].groupId) {
      continue;
    }

    // 1. 이웃피스가 1개라면
    if (pieces[neighborPieceIndex].groupId === null) {
      // 새로운 그룹ID 부여하고 위치변경
      const maxGroupId = getMaxGroupId(me.team);
      piece.groupId = maxGroupId + 1;
      pieces[neighborPieceIndex].groupId = maxGroupId + 1;

      attachPieceToPiece({
        pieceIndex: piece.index,
        toPieceIndex: neighborPieceIndex,
        team: me.team,
        isSend: true,
      });

      continue;
    }

    // 2. 이웃피스가 그룹이라면
    piece.groupId = pieces[neighborPieceIndex].groupId;
    attachPieceToPiece({
      pieceIndex: piece.index,
      toPieceIndex: neighborPieceIndex,
      team: me.team,
      isSend: true,
    });
  }
};
