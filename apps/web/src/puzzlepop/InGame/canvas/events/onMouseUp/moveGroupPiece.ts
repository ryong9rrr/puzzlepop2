import { Direction } from "@puzzlepop2/game-core";

import { TeamColor } from "../../../../types/base";
import { CanvasPiece, canvasStaticStore } from "../../canvasStaticStore";

import { getNeighborPieceIndexMap } from "../../utils/getNeighborPieceIndexMap";
import { attachPieceToPiece } from "../../utils/attachPieceToPiece";

import { isNeighbor } from "./isNeighbor";

export const moveGroupPiece = (piece: CanvasPiece) => {
  const {
    initData: { me },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  const currentGroupPieces = pieces.filter(p => p.groupId === piece.groupId);

  // 사이드피스만 순회
  const sidePieces = getSidePiecesBySameGroupPieces(currentGroupPieces);

  // sidePieces를 대상으로 4방향 확인하며 근처에 붙일 수 있는 피스가 있는지 확인
  for (const sidePiece of sidePieces) {
    // 좌상우하 확인
    const neighborPieceIndexMap = getNeighborPieceIndexMap(piece.index);

    for (const _d of Object.keys(neighborPieceIndexMap)) {
      const direction = _d as Direction;
      const neighborPieceIndex = neighborPieceIndexMap[direction];

      // 테두리면 pass
      if (neighborPieceIndex === null) {
        continue;
      }

      // 같은 그룹이면 pass
      if (sidePiece.groupId === pieces[neighborPieceIndex].groupId) {
        continue;
      }

      // 근처에 없다면 pass
      if (!isNeighbor(sidePiece.index, neighborPieceIndex, me.team)) {
        continue;
      }

      // 붙일 피스가 1개짜리라면
      if (pieces[neighborPieceIndex].groupId === null) {
        // 1개짜리 피스 그룹ID 부여
        pieces[neighborPieceIndex].groupId = piece.groupId;
        // 그냥 한개짜리를 그룹에 붙임
        attachPieceToPiece({
          pieceIndex: sidePiece.index,
          toPieceIndex: neighborPieceIndex,
          team: me.team,
          isSend: true,
        });
        continue;
      }

      // 그룹과 그룹을 붙이는 경우
      attachGroupToGroup(sidePiece.index, neighborPieceIndex, me.team);
    }
  }
};

const getSidePiecesBySameGroupPieces = (sameGroupPieces: CanvasPiece[]) => {
  const sidePieces: CanvasPiece[] = [];

  const sameGroupPieceIndexSet = new Set(sameGroupPieces.map(p => p.index));

  for (const p of sameGroupPieces) {
    const { left, right, top, bottom } = getNeighborPieceIndexMap(p.index);

    const isEmptyLeft = left !== null && !sameGroupPieceIndexSet.has(left);
    const isEmptyRight = right !== null && !sameGroupPieceIndexSet.has(right);
    const isEmptyTop = top !== null && !sameGroupPieceIndexSet.has(top);
    const isEmptyBottom = bottom !== null && !sameGroupPieceIndexSet.has(bottom);

    // 좌우상하 중 하나라도 비어있다면 sidePieces에 추가
    if (isEmptyLeft || isEmptyRight || isEmptyTop || isEmptyBottom) {
      sidePieces.push(p);
    }
  }

  return sidePieces;
};

const attachGroupToGroup = (pieceIndex: number, toPieceIndex: number, team: TeamColor) => {
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  const visited = new Set<number>();
  const q = [pieceIndex];
  visited.add(pieceIndex);

  // 일단 첫번째 피스 붙여주고
  attachPieceToPiece({
    pieceIndex,
    toPieceIndex,
    team,
    isSend: true,
  });

  // 나머지 뭉탱이 옮기기
  while (q.length > 0) {
    const currentPieceIndex = q.shift()!;

    const { left, right, top, bottom } = getNeighborPieceIndexMap(currentPieceIndex);
    const neighborIndexList = [left, right, top, bottom];

    for (const neighborIndex of neighborIndexList) {
      // 없으면 pass
      if (neighborIndex === null) {
        continue;
      }

      // 같은 그룹이 아니거나 이미 방문했다면(이미 붙인 피스라면) pass
      if (
        pieces[neighborIndex].groupId !== pieces[currentPieceIndex].groupId ||
        visited.has(neighborIndex)
      ) {
        continue;
      }

      attachPieceToPiece({
        pieceIndex: neighborIndex,
        toPieceIndex: currentPieceIndex,
        team,
        isSend: false,
      });

      visited.add(neighborIndex);
      q.push(neighborIndex);
    }
  }

  // 그룹ID부여
  const groupId = pieces[toPieceIndex].groupId;
  for (const mergedIndex of visited) {
    pieces[mergedIndex].groupId = groupId;
  }
};
