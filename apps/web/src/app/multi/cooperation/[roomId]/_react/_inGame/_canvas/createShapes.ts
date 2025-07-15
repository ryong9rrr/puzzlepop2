import { Shape, MultiGamePuzzlePiece } from "@puzzlepop2/game-core";
import { canvasStore } from "./store";

export const createShapes = (board: MultiGamePuzzlePiece[][]): Shape[] => {
  const { lengthCount, widthCount } = canvasStore.getState();

  const shapes: Shape[] = [];

  for (let i = 0; i < lengthCount; i += 1) {
    for (let j = 0; j < widthCount; j += 1) {
      const { type } = board[i][j];
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
