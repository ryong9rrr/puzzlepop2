export type GameLevel = "easy" | "normal" | "hard";

export interface MouseEventHandlerProps {
  event: paper.MouseEvent;
}

export interface PuzzleGameProps {
  gameLevel: GameLevel;
  pieceList?: PuzzlePiece[];
  onMouseDrag?: (props: MouseEventHandlerProps) => void;
  onMouseEnter?: (props: MouseEventHandlerProps) => void;
  onMouseLeave?: (props: MouseEventHandlerProps) => void;
}

export type PieceShape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type PuzzlePiece = {
  index: number;
  shape: PieceShape;
  groupId: number | null;
  position: { x: number; y: number };
};
