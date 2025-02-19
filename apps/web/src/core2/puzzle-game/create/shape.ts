import { PieceShape } from "../../types";

export const createShapes = ({ perColumn, perRow }: { perColumn: number; perRow: number }) => {
  const shapes: PieceShape[] = Array.from({ length: perColumn * perRow }, () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }));

  for (let y = 0; y < perColumn; y++) {
    for (let x = 0; x < perRow; x++) {
      const shape = shapes[y * perRow + x];

      const shapeRight = x < perRow - 1 ? shapes[y * perRow + (x + 1)] : null;

      const shapeBottom = y < perColumn - 1 ? shapes[(y + 1) * perRow + x] : null;

      shapes[y * perRow + x].right = x < perRow - 1 ? getRandomValue() : shape.right;

      if (shapeRight && !!shape.right) {
        shapeRight.left = -shape.right;
      }

      shapes[y * perRow + x].bottom = y < perColumn - 1 ? getRandomValue() : shape.bottom;

      if (shapeBottom && !!shape.bottom) {
        shapeBottom.top = -shape.bottom;
      }
    }
  }

  return shapes;
};

// -1 or 1 (들어간 모양인지 나온 모양인지) 결정
const getRandomValue = () => {
  return Math.pow(-1, Math.floor(Math.random() * 2));
};
