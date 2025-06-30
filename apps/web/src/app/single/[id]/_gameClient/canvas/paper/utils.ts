import { Direction } from "@puzzlepop2/game-core";

import { getGameStore } from "../../store";

export const getPieceId = (x: number, y: number) => {
  const { perColumn, perRow } = getGameStore();

  if (0 <= x && x < perRow && 0 <= y && y < perColumn) {
    return y * perRow + x;
  }
  throw new Error("x는 perRow, y는 perColumn 기준이에요");
};

export const getNeighborPieceIdMap = (pieceId: number): Record<Direction, number | null> => {
  const { perColumn, perRow } = getGameStore();

  return {
    left: pieceId % perRow === 0 ? null : pieceId - 1,
    right: (pieceId + 1) % perRow === 0 ? null : pieceId + 1,
    top: pieceId - perRow < 0 ? null : pieceId - perRow,
    bottom: pieceId + perRow >= perRow * perColumn ? null : pieceId + perRow,
  };
};
