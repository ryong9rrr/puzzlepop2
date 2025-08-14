export type PracticeGameLevel = "easy" | "normal" | "hard";

export type Direction = "top" | "right" | "bottom" | "left";

export type Piece = {
  index: number;
  shape: Shape;
  groupId: number | null;
  position: { x: number; y: number };
};

export type Shape = Record<Direction, number>;
