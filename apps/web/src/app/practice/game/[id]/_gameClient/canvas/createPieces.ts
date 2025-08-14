import {
  Piece,
  Shape,
  SINGLE_GAME_PUZZLE_PIECE_SIZE_MAP,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "@puzzlepop2/game-core";

type InitPiecePosition = "random" | "arranged";

type CreatePiecesProps = {
  gameLevel: "easy" | "normal" | "hard";
  imgWidth: number;
  imgHeight: number;
  options?: {
    position?: InitPiecePosition;
  };
};

type CreateShapesProps = {
  perColumn: number;
  perRow: number;
};

export const createPieces = (props: CreatePiecesProps) => {
  const { gameLevel, imgWidth, imgHeight, options } = props;
  const pieceSize = SINGLE_GAME_PUZZLE_PIECE_SIZE_MAP[gameLevel];
  const perColumn = Math.floor(imgHeight / pieceSize);
  const perRow = Math.floor(imgWidth / pieceSize);

  const shapes = createShapes({ perColumn, perRow });

  const pieces: Piece[] = [];
  for (let y = 0; y < perColumn; y += 1) {
    for (let x = 0; x < perRow; x += 1) {
      const shape = shapes[y * perRow + x];

      const position = calculatePiecePosition({
        row: y,
        column: x,
        pieceSize,
        initPiecePosition: options?.position || "arranged",
      });

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

const calculatePiecePosition = (props: {
  row: number;
  column: number;
  pieceSize: number;
  initPiecePosition: InitPiecePosition;
}): {
  x: number;
  y: number;
} => {
  const { row, column, pieceSize, initPiecePosition } = props;

  if (initPiecePosition === "random") {
    const marginX = CANVAS_WIDTH * 0.1;
    const marginY = CANVAS_HEIGHT * 0.1;
    const innerWidth = CANVAS_WIDTH * 0.8;
    const innerHeight = CANVAS_HEIGHT * 0.8;

    const x = Math.random() * (innerWidth - pieceSize) + marginX;
    const y = Math.random() * (innerHeight - pieceSize) + marginY;
    return { x, y };
  }

  return {
    x: pieceSize * column + 100,
    y: pieceSize * row + 100,
  };
};
