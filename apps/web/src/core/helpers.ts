import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import { CURVY_COORDINATES, PERCENTAGE_TOTAL } from "./constants";
import { Direction, PieceGroup, PieceShape, Size as TSize } from "./types";
import { findXChange, findXUp, findYChange, findYUp } from "./findChange";

export const resizeImage = (props: {
  imgElement: HTMLImageElement;
  canvasElement: HTMLCanvasElement;
}) => {
  const { imgElement, canvasElement } = props;

  if (
    !imgElement ||
    !canvasElement ||
    !imgElement.width ||
    !imgElement.height ||
    !canvasElement.width ||
    !canvasElement.height
  ) {
    return null;
  }

  if (imgElement.width <= canvasElement.width && imgElement.height <= canvasElement.height) {
    return { width: Math.floor(imgElement.width), height: Math.floor(imgElement.height) };
  }

  const ratio = Math.min(
    canvasElement.width / imgElement.width,
    canvasElement.height / imgElement.height,
  );
  return {
    width: Math.floor(imgElement.width * ratio),
    height: Math.floor(imgElement.height * ratio),
  };
};

export const getMask = (props: { pieceSize: number; pieceShape: PieceShape; imageSize: TSize }) => {
  const { pieceSize, pieceShape, imageSize } = props;

  if (Object.values(pieceShape).some(value => value === null)) {
    return null;
  }

  const pieceRatio = pieceSize / PERCENTAGE_TOTAL;
  const mask = new Paper.Path();

  const topLeftEdge = new Point(-imageSize.width / 2, -imageSize.height / 2);
  mask.moveTo(topLeftEdge);

  // top
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      topLeftEdge.x + CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
      topLeftEdge.y + pieceShape.top! * CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
    );

    const p2 = new Point(
      topLeftEdge.x + CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
      topLeftEdge.y + pieceShape.top! * CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
    );

    const p3 = new Point(
      topLeftEdge.x + CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
      topLeftEdge.y + pieceShape.top! * CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
  }

  // right
  const topRightEdge = new Point(topLeftEdge.x + pieceSize, topLeftEdge.y);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      topRightEdge.x - pieceShape.right! * CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
      topRightEdge.y + CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
    );
    const p2 = new Point(
      topRightEdge.x - pieceShape.right! * CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
      topRightEdge.y + CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
    );
    const p3 = new Point(
      topRightEdge.x - pieceShape.right! * CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
      topRightEdge.y + CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // bottom
  const bottomRightEdge = new Point(topRightEdge.x, topRightEdge.y + pieceSize);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      bottomRightEdge.x - CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
      bottomRightEdge.y - pieceShape.bottom! * CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
    );
    const p2 = new Point(
      bottomRightEdge.x - CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
      bottomRightEdge.y - pieceShape.bottom! * CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
    );
    const p3 = new Point(
      bottomRightEdge.x - CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
      bottomRightEdge.y - pieceShape.bottom! * CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // left
  const bottomLeftEdge = new Point(bottomRightEdge.x - pieceSize, bottomRightEdge.y);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      bottomLeftEdge.x + pieceShape.left! * CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
      bottomLeftEdge.y - CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
    );
    const p2 = new Point(
      bottomLeftEdge.x + pieceShape.left! * CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
      bottomLeftEdge.y - CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
    );
    const p3 = new Point(
      bottomLeftEdge.x + pieceShape.left! * CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
      bottomLeftEdge.y - CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  return mask;
};

export const groupedPiece = (props: {
  perRow: number;
  perColumn: number;
  pieceGroup: PieceGroup;
  pieceGroupList: PieceGroup[];
  shapeList: PieceShape[];
  pieceSize: number;
}) => {
  const { perRow, perColumn, pieceGroup, pieceGroupList, shapeList, pieceSize } = props;

  const currentPieceId = pieceGroup.pieceId;

  const nextPieceDirectionMap: Record<Direction, number | null> = {
    top: currentPieceId - perRow < 0 ? null : currentPieceId - perRow,
    left: currentPieceId % perRow === 0 ? null : currentPieceId - 1,
    right: (currentPieceId + 1) % perRow === 0 ? null : currentPieceId + 1,
    bottom: currentPieceId + perRow >= perRow * perColumn ? null : currentPieceId + perRow,
  };

  const nextPieceMap: Record<Direction, PieceGroup | null> = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };

  const nextPieceShapeMap: Record<Direction, PieceShape | null> = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };

  Object.entries(nextPieceDirectionMap).forEach(([_direction, nextPieceId]) => {
    const direction = _direction as Direction;

    if (
      방향에_따라_퍼즐이_맞춰졌는가({
        perRow,
        perColumn,
        currentPieceId,
        nextPieceId,
        direction,
        pieceGroupList,
      })
    ) {
      nextPieceMap[direction] = pieceGroupList[nextPieceId!];
      nextPieceShapeMap[direction] = shapeList[nextPieceId!];
    }
  });

  Object.entries(nextPieceMap).forEach(([_direction, nextPieceGroup]) => {
    const direction = _direction as Direction;
    if (!!nextPieceGroup) {
      fitPiece({
        pieceGroup,
        direction,
        nextPieceDirectionMap,
        nextPieceShapeMap,
        shapeList,
        currentPieceId,
        pieceSize,
        nextPieceGroup,
      });
    }
  });
};

const 방향에_따라_퍼즐이_맞춰졌는가 = (props: {
  perRow: number;
  perColumn: number;
  currentPieceId: number;
  nextPieceId: number | null;
  direction: Direction;
  pieceGroupList: PieceGroup[];
}) => {
  const { perRow, perColumn, currentPieceId, nextPieceId, direction, pieceGroupList } = props;

  if (!!nextPieceId && !!pieceGroupList[currentPieceId] && !!pieceGroupList[nextPieceId]) {
    const nowGroupId = pieceGroupList[currentPieceId].groupId;
    const nextGroupId = pieceGroupList[nextPieceId].groupId;
    if (!!nowGroupId && nowGroupId === nextGroupId) {
      return true;
    }
  }

  if (currentPieceId % perRow === 0 && direction === "left") {
    return true;
  }

  if ((currentPieceId + 1) % perRow === 0 && direction === "right") {
    return true;
  }

  if (currentPieceId < perRow && direction === "top") {
    return true;
  }

  if (currentPieceId >= perRow * perColumn - perRow && direction === "bottom") {
    return true;
  }

  return false;
};

const fitPiece = (props: {
  pieceGroup: PieceGroup;
  direction: Direction;
  nextPieceDirectionMap: Record<Direction, number | null>;
  nextPieceShapeMap: Record<Direction, PieceShape | null>;
  shapeList: PieceShape[];
  currentPieceId: number;
  pieceSize: number;
  nextPieceGroup: PieceGroup;
}) => {
  const {
    pieceGroup,
    direction,
    nextPieceDirectionMap,
    nextPieceShapeMap,
    shapeList,
    currentPieceId,
    pieceSize,
    nextPieceGroup,
  } = props;

  const xChange = findXChange(shapeList[currentPieceId], nextPieceShapeMap[direction]!);
  const yChange = findYChange(shapeList[currentPieceId], nextPieceShapeMap[direction]!);
  const xUp = findXUp(shapeList[currentPieceId], nextPieceShapeMap[direction]!);
  const yUp = findYUp(shapeList[currentPieceId], nextPieceShapeMap[direction]!);

  // 오차범위
  const errorRange = pieceSize * 0.2;

  if (direction === "left") {
    if (
      Math.abs(pieceGroup.piece.position.x - pieceSize - nextPieceGroup.piece.position.x) <
        errorRange &&
      Math.abs(pieceGroup.piece.position.y - nextPieceGroup.piece.position.y) < errorRange
    ) {
      pieceGroup.piece.position = new Point(
        nextPieceGroup.piece.position.x + pieceSize + xChange,
        nextPieceGroup.piece.position.y + yChange,
      );

      uniteTiles();
      return;
    }
    return;
  }

  if (direction === "right") {
    if (
      Math.abs(nextPieceGroup.piece.position.x - pieceSize - pieceGroup.piece.position.x) <
        errorRange &&
      Math.abs(pieceGroup.piece.position.y - nextPieceGroup.piece.position.y) < errorRange
    ) {
      pieceGroup.piece.position = new Point(
        nextPieceGroup.piece.position.x - pieceSize + xChange,
        nextPieceGroup.piece.position.y + yChange,
      );

      uniteTiles();
      return;
    }

    return;
  }

  if (direction === "top") {
    if (
      Math.abs(nextPieceGroup.piece.position.y + pieceSize - pieceGroup.piece.position.y) <
        errorRange &&
      Math.abs(pieceGroup.piece.position.x - nextPieceGroup.piece.position.x) < errorRange
    ) {
      pieceGroup.piece.position = new Point(
        nextPieceGroup.piece.position.x + xUp,
        nextPieceGroup.piece.position.y + pieceSize + yUp,
      );

      uniteTiles();
      return;
    }

    return;
  }

  if (direction === "bottom") {
    if (
      Math.abs(pieceGroup.piece.position.y + pieceSize - nextPieceGroup.piece.position.y) <
        errorRange &&
      Math.abs(pieceGroup.piece.position.x - nextPieceGroup.piece.position.x) < errorRange
    ) {
      pieceGroup.piece.position = new Point(
        nextPieceGroup.piece.position.x + xUp,
        nextPieceGroup.piece.position.y - pieceSize + yUp,
      );

      uniteTiles();
      return;
    }

    return;
  }
};

const uniteTiles = () => {
  // TODO...
};
