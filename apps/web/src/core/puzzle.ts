import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import { PieceGroup, PieceShape, PuzzleProps, Size } from "./types";
import { getMask, groupedPiece, resizeImage } from "./helpers";
import { getRandomShapes } from "./getRandomShapes";
import {
  BORDER_STROKE_COLOR,
  MASK_STROKE_COLOR,
  BORDER_STROKE_WIDTH,
  MASK_OPACITY,
  PIECE_OPACITY,
} from "./constants";
import { IMG_ID, queryCanvasElement, queryImageElement } from "./dom";

export class Puzzle {
  private pieceSize = 100; // 임시
  private pieceShapeList: PieceShape[] = [];
  private isComplete = false;

  private pieceList: paper.Group[] = [];
  private PieceGroupList: PieceGroup[] = [];

  //groupTileIndex: number | null;

  private onMouseDragHandler?: (props: { event: paper.MouseEvent }) => void;
  private onMouseEnterHandler?: (props: { event: paper.MouseEvent }) => void;
  private onMouseLeaveHandler?: (props: { event: paper.MouseEvent }) => void;

  constructor(props?: PuzzleProps) {
    this.onMouseDragHandler = props?.onMouseDrag;
    this.onMouseEnterHandler = props?.onMouseEnter;
    this.onMouseLeaveHandler = props?.onMouseLeave;

    this.runAfterLoadImage();
  }

  private get imgElement() {
    const dom = queryImageElement();
    if (!dom || !(dom instanceof HTMLImageElement)) {
      throw new Error("이미지를 찾을 수 없습니다.");
    }
    return dom;
  }

  private get canvasElement() {
    const dom = queryCanvasElement();
    if (!dom || !(dom instanceof HTMLCanvasElement)) {
      throw new Error("캔버스를 찾을 수 없습니다.");
    }
    return dom;
  }

  private get imageSize() {
    const size = resizeImage({ imgElement: this.imgElement, canvasElement: this.canvasElement });
    if (!size) {
      throw new Error("이미지 사이즈를 계산할 수 없습니다.");
    }
    return size;
  }

  private get perRow() {
    return Math.floor(this.imageSize.width / this.pieceSize);
  }

  private get perColumn() {
    return Math.floor(this.imageSize.height / this.pieceSize);
  }

  private runAfterLoadImage() {
    // 새로고침 시 동작
    if (this.imgElement.complete) {
      this.setup();
      return;
    }

    // 라우팅 시 동작
    this.imgElement.onload = () => {
      this.setup();
    };
  }

  setup() {
    console.log("puzzle setup");

    Paper.setup(this.canvasElement);

    // this.setupPieceShapeList();
    // this.setupPiece();

    // this.attachMouseEventHandlerToPiece();
    // this.attachMouseEventHandlerToGrouping();
  }

  private setupPieceShapeList() {
    this.pieceShapeList = getRandomShapes({
      perColumn: this.perColumn,
      perRow: this.perRow,
    });
  }

  private setupPiece() {
    for (let y = 0; y < this.perColumn; y += 1) {
      for (let x = 0; x < this.perRow; x += 1) {
        const pieceShape = this.pieceShapeList[y * this.perRow + x];
        const mask = getMask({
          imageSize: this.imageSize,
          pieceSize: this.pieceSize,
          pieceShape,
        });
        if (!mask) {
          continue;
        }

        mask.opacity = MASK_OPACITY;
        mask.strokeColor = new Paper.Color(MASK_STROKE_COLOR);

        const piece = this.cratePiece({ mask, x, y });
        this.pieceList.push(piece);
        this.PieceGroupList.push({ groupId: null, pieceId: y * this.perRow + x, piece });
      }
    }
  }

  private cratePiece(props: { mask: paper.Path; x: number; y: number }) {
    const { mask, x, y } = props;

    const offset = new Point(this.pieceSize * x, this.pieceSize * y);
    const scale = Math.max(
      this.imageSize.width / this.imgElement.width,
      this.imageSize.height / this.imgElement.height,
    );
    const pieceRaster = new Paper.Raster(IMG_ID);
    pieceRaster.scale(scale);
    pieceRaster.position = new Point(-offset.x, -offset.y);

    const border = mask.clone();
    border.strokeColor = new Paper.Color(BORDER_STROKE_COLOR);
    border.strokeWidth = BORDER_STROKE_WIDTH;

    const piece = new Paper.Group([mask, pieceRaster, border]);
    piece.clipped = true;
    piece.opacity = PIECE_OPACITY;
    piece.position = new Point(this.pieceSize, this.pieceSize); // TODO: 위치 아래에서 다시 조정할 것임.
    return piece;
  }

  private attachMouseEventHandlerToPiece() {
    this.PieceGroupList.forEach(pieceGroup => {
      pieceGroup.piece.onMouseDown = (event: paper.MouseEvent) => {
        const groupId = pieceGroup.groupId;
        const isGrouped = groupId !== null;

        if (isGrouped) {
          this.PieceGroupList.forEach(anotherPieceGroup => {
            if (anotherPieceGroup.groupId === groupId) {
              anotherPieceGroup.piece.bringToFront();
            }
          });
        } else {
          event.target.bringToFront();
        }
      };

      pieceGroup.piece.onMouseDrag = (event: paper.MouseEvent) => {
        // 캔버스 사이즈를 벗어나지 않는 범위내로 이동
        const nextPosition = {
          x: Math.min(
            Math.max(pieceGroup.piece.position.x + event.delta.x, Math.floor(this.pieceSize / 2)),
            Paper.view.viewSize.width - Math.floor(this.pieceSize / 2),
          ),
          y: Math.min(
            Math.max(pieceGroup.piece.position.y + event.delta.y, Math.floor(this.pieceSize / 2)),
            Paper.view.viewSize.height - Math.floor(this.pieceSize / 2),
          ),
        };

        const prevPosition = {
          x: pieceGroup.piece.position.x,
          y: pieceGroup.piece.position.y,
        };

        if (pieceGroup.groupId === null) {
          pieceGroup.piece.position = new Point(nextPosition.x, nextPosition.y);
        } else {
          this.PieceGroupList.forEach(anotherPieceGroup => {
            if (pieceGroup.groupId === anotherPieceGroup.groupId) {
              anotherPieceGroup.piece.position = new Point(
                anotherPieceGroup.piece.position.x + nextPosition.x - prevPosition.x,
                anotherPieceGroup.piece.position.y + nextPosition.y - prevPosition.y,
              );
            }
          });
        }

        this.onMouseDragHandler?.({ event });
      };

      pieceGroup.piece.onMouseEnter = (event: paper.MouseEvent) => {
        this.onMouseEnterHandler?.({ event });
      };

      pieceGroup.piece.onMouseLeave = (event: paper.MouseEvent) => {
        this.onMouseLeaveHandler?.({ event });
      };
    });
  }

  private attachMouseEventHandlerToGrouping() {
    this.PieceGroupList.forEach(pieceGroup => {
      pieceGroup.piece.onMouseUp = (event: paper.MouseEvent) => {
        const groupId = pieceGroup.groupId;
        const isGrouped = groupId !== null;
        if (isGrouped) {
          this.PieceGroupList.forEach(anotherPieceGroup => {
            if (
              anotherPieceGroup.groupId === groupId &&
              anotherPieceGroup.pieceId !== pieceGroup.pieceId
            ) {
              groupedPiece({
                perColumn: this.perColumn,
                perRow: this.perRow,
                pieceGroup: anotherPieceGroup,
                pieceGroupList: this.PieceGroupList,
                shapeList: this.pieceShapeList,
                pieceSize: this.pieceSize,
              });
            }
          });
        }
        groupedPiece({
          perColumn: this.perColumn,
          perRow: this.perRow,
          pieceGroup,
          pieceGroupList: this.PieceGroupList,
          shapeList: this.pieceShapeList,
          pieceSize: this.pieceSize,
        });

        console.log("onMouseUp");
        console.log(this.PieceGroupList);
        console.log(this.pieceShapeList);
      };
    });
  }
}
