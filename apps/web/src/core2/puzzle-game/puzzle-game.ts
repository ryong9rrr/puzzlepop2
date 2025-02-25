import Paper from "paper";
import { GameLevel, PuzzleGameProps, PuzzlePiece } from "../types";
import {
  BORDER_STROKE_COLOR,
  BORDER_STROKE_WIDTH,
  MASK_OPACITY,
  MASK_STROKE_COLOR,
  PIECE_OPACITY,
} from "./constants";
import { Point, view } from "paper/dist/paper-core";
import { createShapes } from "./create/shape";
import { getMask } from "./create/mask";
import { createRandomPosition } from "./create/position";
import { save } from "./validation/parsePieceList";
import { queryCanvasElement, queryImageElement } from "../dom";
import { resizeImage } from "./helpers/image-raster";

export class PuzzleGame {
  private _imgElement: HTMLImageElement | null = null;
  private _canvasElement: HTMLCanvasElement | null = null;

  private gameLevel: GameLevel;
  private pieceList: PuzzlePiece[] | null = null;

  private onMouseDragHandler?: (props: { event: paper.MouseEvent }) => void;
  private onMouseEnterHandler?: (props: { event: paper.MouseEvent }) => void;
  private onMouseLeaveHandler?: (props: { event: paper.MouseEvent }) => void;

  constructor(props: PuzzleGameProps) {
    const { gameLevel, pieceList = null, onMouseDrag, onMouseEnter, onMouseLeave } = props;

    this.gameLevel = gameLevel;

    this.pieceList = pieceList;

    this.onMouseDragHandler = onMouseDrag;
    this.onMouseEnterHandler = onMouseEnter;
    this.onMouseLeaveHandler = onMouseLeave;
  }

  get pieceSize() {
    const pieceSizeMap: Record<GameLevel, number> = {
      easy: 100,
      normal: 80,
      hard: 50,
    };
    return pieceSizeMap[this.gameLevel];
  }

  get perRow() {
    return Math.floor(this.imgElement.width / this.pieceSize);
  }

  get perColumn() {
    return Math.floor(this.imgElement.height / this.pieceSize);
  }

  get imageSize() {
    return { width: this.imgElement.clientWidth, height: this.imgElement.clientHeight };
  }

  get imgElement() {
    if (!this._imgElement) {
      this._imgElement = queryImageElement();
    }
    return this._imgElement;
  }

  get canvasElement() {
    if (!this._canvasElement) {
      this._canvasElement = queryCanvasElement();
    }
    return this._canvasElement;
  }

  load(): Promise<void> | void {
    if (this.imgElement.complete) {
      console.log("complete");
      this.run();
      //this.setup();
      return;
    }
    return new Promise((resolve, reject) => {
      this.imgElement.onload = () => {
        console.log("load");
        try {
          this.run();
          //this.setup();
          resolve();
        } catch (error) {
          console.error(error);
          reject();
          return;
        }
        return;
      };

      this.imgElement.onerror = () => {
        console.log("error");
        reject();
        return;
      };
    });
  }

  private setup() {
    Paper.setup(this.canvasElement);
  }

  run() {
    Paper.setup(this.canvasElement);

    console.log(`원본 이미지의 크기 : ${this.imgElement.width} x ${this.imgElement.height}`);

    const resizedImageSize = resizeImage({
      imgElement: this.imgElement,
      canvasElement: this.canvasElement,
    });

    console.log(
      `캔버스 안에 들어갈만한 크기 : ${resizedImageSize.width} x ${resizedImageSize.height}`,
    );

    console.log("--------------------");
    for (const pieceSize of [50, 80, 100]) {
      console.log(`퍼즐 조각의 크기가 ${pieceSize}일 때`);
      const perRow = Math.floor(resizedImageSize.width / pieceSize);
      const perColumn = Math.floor(resizedImageSize.height / pieceSize);
      console.log(
        `딱 나눠 떨어지려면 너비가 ${perRow * pieceSize}, 높이가 ${perColumn * pieceSize}`,
      );
      console.log(`가로 ${perRow}개, 세로 ${perColumn}개로 나누어집니다.`);
      console.log("--------------------");
    }

    if (!this.pieceList) {
      this.pieceList = this.createPieceList();
      //save({ pieceList: this.pieceList });
      return;
    }

    // const shapeList = this.pieceList.map(piece => piece.shape);
    // const pieceGroupList = [];

    // for (let y = 0; y < this.perColumn; y += 1) {
    //   for (let x = 0; x < this.perRow; x += 1) {
    //     const index = y * this.perRow + x;
    //     const _piece = this.pieceList[index];
    //     const shape = _piece.shape;
    //     const mask = getMask({
    //       imageSize: this.imageSize,
    //       pieceSize: this.pieceSize,
    //       pieceShape: shape,
    //     });
    //     if (!mask) {
    //       continue;
    //     }

    //     mask.opacity = MASK_OPACITY;
    //     mask.strokeColor = new Paper.Color(MASK_STROKE_COLOR);

    //     const piece = this.cratePiece({ mask, x, y });
    //     piece.position.x = _piece.position.x;
    //     piece.position.y = _piece.position.y;
    //     pieceGroupList.push({ groupId: null, pieceId: y * this.perRow + x, piece });
    //   }
    // }

    // // 정제된 데이터
    // const pieceList: PuzzlePiece[] = [];
    // for (const pieceGroup of pieceGroupList) {
    //   const index = pieceGroup.pieceId;
    //   const shape = shapeList[index];
    //   const groupId = pieceGroup.groupId;
    //   const x = pieceGroup.piece.position.x;
    //   const y = pieceGroup.piece.position.y;
    //   pieceList.push({
    //     index,
    //     shape,
    //     groupId,
    //     position: { x, y },
    //   });
    // }

    // this.pieceList = pieceList;
    // save({ pieceList: this.pieceList });
  }

  private createPieceList() {
    const shapeList = createShapes({
      perColumn: this.perColumn,
      perRow: this.perRow,
    });

    const pieceGroupList = [];

    for (let y = 0; y < this.perColumn; y += 1) {
      for (let x = 0; x < this.perRow; x += 1) {
        const pieceShape = shapeList[y * this.perRow + x];
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

        const randomPosition = createRandomPosition({
          canvasElement: this.canvasElement,
          pieceSize: this.pieceSize,
        });
        piece.position.x = randomPosition.x;
        piece.position.y = randomPosition.y;

        pieceGroupList.push({ groupId: null, pieceId: y * this.perRow + x, piece });
      }
    }

    // 정제된 데이터
    const pieceList: PuzzlePiece[] = [];
    for (const pieceGroup of pieceGroupList) {
      const index = pieceGroup.pieceId;
      const shape = shapeList[index];
      const groupId = pieceGroup.groupId;
      const x = pieceGroup.piece.position.x;
      const y = pieceGroup.piece.position.y;
      pieceList.push({
        index,
        shape,
        groupId,
        position: { x, y },
      });
    }
    return pieceList;
  }

  private cratePiece(props: { mask: paper.Path; x: number; y: number }) {
    const { mask, x, y } = props;

    const offset = new Point(this.pieceSize * x, this.pieceSize * y);

    const pieceRaster = new Paper.Raster(this.imgElement);
    const scaleX = this.imageSize.width / pieceRaster.width;
    const scaleY = this.imageSize.height / pieceRaster.height;
    pieceRaster.scale(scaleX, scaleY);
    // 여기서 x, y에 의해 조각이 렌더링할 "부분"이 결정됨
    pieceRaster.position = new Point(-offset.x, -offset.y);

    const border = mask.clone();
    border.strokeColor = new Paper.Color("red");
    border.strokeWidth = BORDER_STROKE_WIDTH;

    const piece = new Paper.Group([mask, pieceRaster, border]);
    piece.clipped = true;
    piece.opacity = PIECE_OPACITY;
    return piece;
  }
}
