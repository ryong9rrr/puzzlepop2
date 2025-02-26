import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import {
  CANVAS_ID,
  GameLevel,
  IMG_ID,
  Piece,
  PUZZLE_PIECE_SIZE_MAP,
  Shape,
} from "@puzzlepop2/game-core";
import { PaperPiece, PuzzleEngineProps } from "./types";
import * as CONSTANTS from "./constants";

export class PuzzleEngine {
  private imgElement: HTMLImageElement;
  private canvasElement: HTMLCanvasElement;

  private fetchedPieceList: Piece[];
  private paperPieceList: PaperPiece[] = [];

  src: string;
  gameLevel: GameLevel;
  perRow: number;
  perColumn: number;

  constructor(props: PuzzleEngineProps) {
    const { gameLevel, src, pieces, perColumn, perRow } = props;

    this.fetchedPieceList = pieces;

    this.src = src;
    this.gameLevel = gameLevel;
    this.perColumn = perColumn;
    this.perRow = perRow;

    this.imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
    this.canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  }

  get pieceSize() {
    return PUZZLE_PIECE_SIZE_MAP[this.gameLevel];
  }

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.imgElement.complete) {
        this.setup();
        resolve();
        return;
      }

      this.imgElement.onload = () => {
        this.setup();
        resolve();
      };

      this.imgElement.onerror = error => {
        reject(error);
      };
    });
  }

  private async setup() {
    Paper.setup(this.canvasElement);

    for (let y = 0; y < this.perColumn; y += 1) {
      for (let x = 0; x < this.perRow; x += 1) {
        const index = y * this.perRow + x;
        const fetchedPiece = this.fetchedPieceList[index];
        const shape = fetchedPiece.shape;
        const mask = getMask({
          shape,
          pieceSize: this.pieceSize,
          imgWidth: this.imgElement.width,
          imgHeight: this.imgElement.height,
        });

        mask.opacity = CONSTANTS.MASK_OPACITY;
        mask.strokeColor = new Paper.Color(CONSTANTS.MASK_STROKE_COLOR);

        const piece = createPiece({
          mask,
          x,
          y,
          imgElement: this.imgElement,
          pieceSize: this.pieceSize,
        });

        piece.position.x = fetchedPiece.position.x;
        piece.position.y = fetchedPiece.position.y;
        this.paperPieceList.push({ groupId: null, pieceId: y * this.perRow + x, piece });
      }
    }
  }
}

const getMask = (props: {
  pieceSize: number;
  shape: Shape;
  imgWidth: number;
  imgHeight: number;
}) => {
  const { pieceSize, shape, imgWidth, imgHeight } = props;

  const pieceRatio = pieceSize / CONSTANTS.PERCENTAGE_TOTAL;
  const mask = new Paper.Path();

  const topLeftEdge = new Point(-imgWidth / 2, -imgHeight / 2);
  mask.moveTo(topLeftEdge);

  // top
  for (let i = 0; i < CONSTANTS.CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      topLeftEdge.x + CONSTANTS.CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
      topLeftEdge.y + shape.top * CONSTANTS.CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
    );

    const p2 = new Point(
      topLeftEdge.x + CONSTANTS.CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
      topLeftEdge.y + shape.top * CONSTANTS.CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
    );

    const p3 = new Point(
      topLeftEdge.x + CONSTANTS.CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
      topLeftEdge.y + shape.top * CONSTANTS.CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
  }

  // right
  const topRightEdge = new Point(topLeftEdge.x + pieceSize, topLeftEdge.y);
  for (let i = 0; i < CONSTANTS.CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      topRightEdge.x - shape.right * CONSTANTS.CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
      topRightEdge.y + CONSTANTS.CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
    );
    const p2 = new Point(
      topRightEdge.x - shape.right * CONSTANTS.CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
      topRightEdge.y + CONSTANTS.CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
    );
    const p3 = new Point(
      topRightEdge.x - shape.right * CONSTANTS.CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
      topRightEdge.y + CONSTANTS.CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // bottom
  const bottomRightEdge = new Point(topRightEdge.x, topRightEdge.y + pieceSize);
  for (let i = 0; i < CONSTANTS.CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      bottomRightEdge.x - CONSTANTS.CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
      bottomRightEdge.y - shape.bottom * CONSTANTS.CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
    );
    const p2 = new Point(
      bottomRightEdge.x - CONSTANTS.CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
      bottomRightEdge.y - shape.bottom * CONSTANTS.CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
    );
    const p3 = new Point(
      bottomRightEdge.x - CONSTANTS.CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
      bottomRightEdge.y - shape.bottom * CONSTANTS.CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  // left
  const bottomLeftEdge = new Point(bottomRightEdge.x - pieceSize, bottomRightEdge.y);
  for (let i = 0; i < CONSTANTS.CURVY_COORDINATES.length / 6; i++) {
    const p1 = new Point(
      bottomLeftEdge.x + shape.left * CONSTANTS.CURVY_COORDINATES[i * 6 + 1] * pieceRatio,
      bottomLeftEdge.y - CONSTANTS.CURVY_COORDINATES[i * 6 + 0] * pieceRatio,
    );
    const p2 = new Point(
      bottomLeftEdge.x + shape.left * CONSTANTS.CURVY_COORDINATES[i * 6 + 3] * pieceRatio,
      bottomLeftEdge.y - CONSTANTS.CURVY_COORDINATES[i * 6 + 2] * pieceRatio,
    );
    const p3 = new Point(
      bottomLeftEdge.x + shape.left * CONSTANTS.CURVY_COORDINATES[i * 6 + 5] * pieceRatio,
      bottomLeftEdge.y - CONSTANTS.CURVY_COORDINATES[i * 6 + 4] * pieceRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  return mask;
};

const createPiece = (props: {
  mask: paper.Path;
  x: number;
  y: number;
  imgElement: HTMLImageElement;
  pieceSize: number;
}) => {
  const { mask, x, y, imgElement, pieceSize } = props;

  const offset = new Point(pieceSize * x, pieceSize * y);

  const pieceRaster = new Paper.Raster(imgElement);
  // 여기서 x, y에 의해 조각이 렌더링할 "부분"이 결정됨
  pieceRaster.position = new Point(-offset.x, -offset.y);

  const border = mask.clone();
  border.strokeColor = new Paper.Color(CONSTANTS.BORDER_STROKE_COLOR);
  border.strokeWidth = CONSTANTS.BORDER_STROKE_WIDTH;

  const piece = new Paper.Group([mask, pieceRaster, border]);
  piece.clipped = true;
  piece.opacity = CONSTANTS.PIECE_OPACITY;
  return piece;
};
