export type GameMode = "single" | "multi";
export type GameLevel = "easy" | "normal" | "hard";

export type Shape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Piece = {
  index: number;
  shape: Shape;
  groupId: number | null;
  position: { x: number; y: number };
};
