import { GameLevel, Piece } from "@puzzlepop2/game-core";

export interface PuzzleEngineProps {
  gameLevel: GameLevel;
  src: string;
  pieces: Piece[]; // 얘는 서버에서 받아온 데이터임
  perColumn: number;
  perRow: number;
}

export type PaperPiece = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

// TODO: 얘네는 이제 안씀
export type PuzzlePieceShape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type PuzzlePiece = {
  index: number;
  shape: PuzzlePieceShape;
  groupId: number | null;
  position: { x: number; y: number };
};
