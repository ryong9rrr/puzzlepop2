export type GameMode = "single" | "multi";
export type GameLevel = "easy" | "normal" | "hard";
export type Direction = "top" | "right" | "bottom" | "left";

export type Shape = Record<Direction, number>;

export type Piece = {
  index: number;
  shape: Shape;
  groupId: number | null;
  position: { x: number; y: number };
};
