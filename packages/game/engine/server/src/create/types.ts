import { GameLevel } from "@puzzlepop2/game-core";

export type InitPiecePosition = "random" | "arranged";

export type CreatePiecesProps = {
  gameLevel: GameLevel;
  imgWidth: number;
  imgHeight: number;
  options?: {
    position?: InitPiecePosition;
  };
};

export type CreateShapesProps = {
  perColumn: number;
  perRow: number;
};
