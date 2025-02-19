import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import { PieceShape } from "../../types";
import { PERCENTAGE_TOTAL, CURVY_COORDINATES } from "../constants";

export const getMask = (props: {
  pieceSize: number;
  pieceShape: PieceShape;
  imageSize: { width: number; height: number };
}) => {
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
