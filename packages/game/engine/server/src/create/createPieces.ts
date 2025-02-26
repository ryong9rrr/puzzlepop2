import { Piece, Shape, PUZZLE_PIECE_SIZE_MAP } from "@puzzlepop2/game-core";
import { CreatePiecesProps, CreateShapesProps } from "./types";

export const createPieces = (props: CreatePiecesProps) => {
  const { gameLevel, imgWidth, imgHeight } = props;
  const pieceSize = PUZZLE_PIECE_SIZE_MAP[gameLevel];
  const perColumn = Math.floor(imgHeight / pieceSize);
  const perRow = Math.floor(imgWidth / pieceSize);

  const shapes = createShapes({ perColumn, perRow });

  const pieces: Piece[] = [];
  for (let y = 0; y < perColumn; y += 1) {
    for (let x = 0; x < perRow; x += 1) {
      const shape = shapes[y * perRow + x];
      const position = {
        x: pieceSize * x + 100,
        y: pieceSize * y + 100,
      };

      pieces.push({
        index: y * perRow + x,
        shape,
        groupId: null,
        position,
      });
    }
  }

  return {
    pieces,
    perColumn,
    perRow,
  };
};

const createShapes = (props: CreateShapesProps) => {
  const getRandomValue = () => {
    return Math.pow(-1, Math.floor(Math.random() * 2));
  };

  const { perColumn, perRow } = props;

  const shapes: Shape[] = Array.from({ length: perColumn * perRow }, () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }));

  for (let y = 0; y < perColumn; y += 1) {
    for (let x = 0; x < perRow; x += 1) {
      const shape = shapes[y * perRow + x];

      const shapeRight = x < perRow - 1 ? shapes[y * perRow + (x + 1)] : null;

      const shapeBottom = y < perColumn - 1 ? shapes[(y + 1) * perRow + x] : null;

      shapes[y * perRow + x].right = x < perRow - 1 ? getRandomValue() : shape.right;

      if (shapeRight && shape.right) {
        shapeRight.left = -shape.right;
      }

      shapes[y * perRow + x].bottom = y < perColumn - 1 ? getRandomValue() : shape.bottom;

      if (shapeBottom && shape.bottom) {
        shapeBottom.top = -shape.bottom;
      }
    }
  }

  return shapes;
};
