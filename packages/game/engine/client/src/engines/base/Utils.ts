import { Direction } from "@puzzlepop2/game-core";
import { BaseEngine } from "./Base";

export default function (_this: BaseEngine) {
  const getPieceId = (x: number, y: number) => {
    if (0 <= x && x < _this.perRow && 0 <= y && y < _this.perColumn) {
      return y * _this.perRow + x;
    }
    throw new Error("x는 perRow, y는 perColumn 기준이에요");
  };

  const getNeighborPieceIdMap = (pieceId: number): Record<Direction, number | null> => {
    return {
      left: pieceId % _this.perRow === 0 ? null : pieceId - 1,
      right: (pieceId + 1) % _this.perRow === 0 ? null : pieceId + 1,
      top: pieceId - _this.perRow < 0 ? null : pieceId - _this.perRow,
      bottom:
        pieceId + _this.perRow >= _this.perRow * _this.perColumn ? null : pieceId + _this.perRow,
    };
  };

  return {
    getPieceId,
    getNeighborPieceIdMap,
  };
}
