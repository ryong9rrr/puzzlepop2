import { MultiGamePuzzlePiece, Shape } from "@puzzlepop2/game-core";

type Props = {
  board: MultiGamePuzzlePiece[][];
  widthCount: number;
  lengthCount: number;
};

export const createShapes = (props: Props) => {
  const { board, widthCount, lengthCount } = props;

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
