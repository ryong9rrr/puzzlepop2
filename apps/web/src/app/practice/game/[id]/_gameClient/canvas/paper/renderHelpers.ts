import Paper from "paper";
import { Shape } from "@puzzlepop2/game-core";
import * as Styles from "./styles";

export const getMask = (props: {
  pieceSize: number;
  shape: Shape;
  imgWidth: number;
  imgHeight: number;
}) => {
  const CURVY_COORDINATES = [
    0, 0, 35, 15, 37, 5, 37, 5, 40, 0, 38, -5, 38, -5, 20, -20, 50, -20, 50, -20, 80, -20, 62, -5,
    62, -5, 60, 0, 63, 5, 63, 5, 65, 15, 100, 0,
  ];
  const TOTAL_PERCENTAGE = 100;

  const getCurvy = (index: number) => {
    const result = CURVY_COORDINATES[index];
    if (result === undefined || Number.isNaN(result)) {
      throw new Error(`CURVY_COORDINATES[${index}] is NaN`);
    }
    return result;
  };

  const { pieceSize, shape, imgWidth, imgHeight } = props;

  const pieceRatio = pieceSize / TOTAL_PERCENTAGE;
  const mask = new Paper.Path();

  const topLeftEdge = new Paper.Point(-imgWidth / 2, -imgHeight / 2);
  mask.moveTo(topLeftEdge);

  // top
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Paper.Point(
      topLeftEdge.x + getCurvy(i * 6 + 0) * pieceRatio,
      topLeftEdge.y + shape.top * getCurvy(i * 6 + 1) * pieceRatio,
    );

    const p2 = new Paper.Point(
      topLeftEdge.x + getCurvy(i * 6 + 2) * pieceRatio,
      topLeftEdge.y + shape.top * getCurvy(i * 6 + 3) * pieceRatio,
    );

    const p3 = new Paper.Point(
      topLeftEdge.x + getCurvy(i * 6 + 4) * pieceRatio,
      topLeftEdge.y + shape.top * getCurvy(i * 6 + 5) * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
  }

  // right
  const topRightEdge = new Paper.Point(topLeftEdge.x + pieceSize, topLeftEdge.y);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Paper.Point(
      topRightEdge.x - shape.right * getCurvy(i * 6 + 1) * pieceRatio,
      topRightEdge.y + getCurvy(i * 6 + 0) * pieceRatio,
    );
    const p2 = new Paper.Point(
      topRightEdge.x - shape.right * getCurvy(i * 6 + 3) * pieceRatio,
      topRightEdge.y + getCurvy(i * 6 + 2) * pieceRatio,
    );
    const p3 = new Paper.Point(
      topRightEdge.x - shape.right * getCurvy(i * 6 + 5) * pieceRatio,
      topRightEdge.y + getCurvy(i * 6 + 4) * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // bottom
  const bottomRightEdge = new Paper.Point(topRightEdge.x, topRightEdge.y + pieceSize);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Paper.Point(
      bottomRightEdge.x - getCurvy(i * 6 + 0) * pieceRatio,
      bottomRightEdge.y - shape.bottom * getCurvy(i * 6 + 1) * pieceRatio,
    );
    const p2 = new Paper.Point(
      bottomRightEdge.x - getCurvy(i * 6 + 2) * pieceRatio,
      bottomRightEdge.y - shape.bottom * getCurvy(i * 6 + 3) * pieceRatio,
    );
    const p3 = new Paper.Point(
      bottomRightEdge.x - getCurvy(i * 6 + 4) * pieceRatio,
      bottomRightEdge.y - shape.bottom * getCurvy(i * 6 + 5) * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // left
  const bottomLeftEdge = new Paper.Point(bottomRightEdge.x - pieceSize, bottomRightEdge.y);
  for (let i = 0; i < CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Paper.Point(
      bottomLeftEdge.x + shape.left * getCurvy(i * 6 + 1) * pieceRatio,
      bottomLeftEdge.y - getCurvy(i * 6 + 0) * pieceRatio,
    );
    const p2 = new Paper.Point(
      bottomLeftEdge.x + shape.left * getCurvy(i * 6 + 3) * pieceRatio,
      bottomLeftEdge.y - getCurvy(i * 6 + 2) * pieceRatio,
    );
    const p3 = new Paper.Point(
      bottomLeftEdge.x + shape.left * getCurvy(i * 6 + 5) * pieceRatio,
      bottomLeftEdge.y - getCurvy(i * 6 + 4) * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  return mask;
};

export const createPiece = (props: {
  mask: paper.Path;
  x: number;
  y: number;
  imgElement: HTMLImageElement;
  pieceSize: number;
}) => {
  const { mask, x, y, imgElement, pieceSize } = props;

  const offset = new Paper.Point(pieceSize * x, pieceSize * y);

  const pieceRaster = new Paper.Raster(imgElement);
  // 여기서 x, y에 의해 조각이 렌더링할 "부분"이 결정됨
  pieceRaster.position = new Paper.Point(-offset.x, -offset.y);

  const border = mask.clone();
  border.strokeColor = new Paper.Color(Styles.BORDER_STROKE_COLOR);
  border.strokeWidth = Styles.BORDER_STROKE_WIDTH;

  const piece = new Paper.Group([mask, pieceRaster, border]);
  piece.clipped = true;
  piece.opacity = Styles.PIECE_OPACITY;
  return piece;
};
