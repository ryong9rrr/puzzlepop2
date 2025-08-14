import { Direction } from "../../types/base";

import { canvasStaticStore } from "../canvasStaticStore";

export const getNeighborPieceIndexMap = (pieceIndex: number): Record<Direction, number | null> => {
  const {
    initData: { widthCount, lengthCount },
  } = canvasStaticStore.getState();

  const left = pieceIndex % widthCount === 0 ? null : pieceIndex - 1;

  const right = (pieceIndex + 1) % widthCount === 0 ? null : pieceIndex + 1;

  const top = pieceIndex - widthCount < 0 ? null : pieceIndex - widthCount;

  const bottom =
    pieceIndex + widthCount >= widthCount * lengthCount ? null : pieceIndex + widthCount;

  return {
    left,
    right,
    top,
    bottom,
  };
};
