import { GameLevel, Piece } from "@puzzlepop2/game-core";

export interface BaseEngineProps {
  gameLevel: GameLevel;
  src: string;
}

export type PaperPiece = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

export type FetchedData = {
  pieces: Piece[];
  perColumn: number;
  perRow: number;
};

export type OnMouseEventProps = {
  event: paper.MouseEvent;
  paperPiece: PaperPiece;
};
