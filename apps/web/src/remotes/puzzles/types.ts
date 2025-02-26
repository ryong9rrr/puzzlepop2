import { GameLevel, Piece } from "@puzzlepop2/game-core";

export type Puzzle = {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  uploaderId: string;
};

export type SingleGamePuzzle = {
  src: string;
  pieces: Piece[];
  perColumn: number;
  perRow: number;
  level: GameLevel;
} & Puzzle;
