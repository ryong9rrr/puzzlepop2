export type Direction = "top" | "right" | "bottom" | "left";

export type PieceShape = {
  [key in Direction]: number;
};

export type Size = {
  width: number;
  height: number;
};

export type PieceGroup = {
  groupId: number | null;
  pieceId: number;
  piece: paper.Group;
};

interface MouseEventHandlerProps {
  event: paper.MouseEvent;
}

export type PuzzleProps = {
  onMouseDrag?: (props: MouseEventHandlerProps) => void;
  onMouseEnter?: (props: MouseEventHandlerProps) => void;
  onMouseLeave?: (props: MouseEventHandlerProps) => void;
};
