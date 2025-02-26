import { GameLevel } from "@puzzlepop2/game-core";

export type CreatePiecesProps = {
  gameLevel: GameLevel;
  imgWidth: number;
  imgHeight: number;
};

export type CreateShapesProps = {
  perColumn: number;
  perRow: number;
};
