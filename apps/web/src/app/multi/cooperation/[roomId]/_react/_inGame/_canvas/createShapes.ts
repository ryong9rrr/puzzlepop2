import { Shape, MultiGamePuzzlePiece } from "@puzzlepop2/game-core";

export const createShapes = (params: {
  board: MultiGamePuzzlePiece[][];
  widthCount: number;
  lengthCount: number;
}): Shape[] => {
  const { board, widthCount, lengthCount } = params;

  const shapes: Shape[] = [];

  for (let y = 0; y < lengthCount; y += 1) {
    for (let x = 0; x < widthCount; x += 1) {
      const { type } = board[y][x];
      const [top, right, bottom, left] = type;
      shapes.push({
        top,
        right,
        bottom,
        left,
      });
    }
  }

  return shapes;
};
