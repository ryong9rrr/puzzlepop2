import { SingleGameLevelType } from "@puzzlepop2/game-core";

export type InitPiecePosition = "random" | "arranged";

export type CreatePiecesProps = {
  gameLevel: SingleGameLevelType;
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
