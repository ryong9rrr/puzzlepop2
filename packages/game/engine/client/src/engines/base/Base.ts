import Paper from "paper";
import {
  CANVAS_ID,
  Direction,
  GameLevel,
  IMG_ID,
  Piece,
  PUZZLE_PIECE_SIZE_MAP,
} from "@puzzlepop2/game-core";
import { getMask, createPiece } from "./render";
import { PaperPiece, BaseEngineProps, FetchedData, OnMouseEventProps } from "./types";
import utils from "./Utils";
import * as Styles from "./styles";

export abstract class BaseEngine {
  protected imgElement: HTMLImageElement;
  protected canvasElement: HTMLCanvasElement;
  protected paperPieceList: PaperPiece[] = [];

  private _perColumn: number | null = null;
  private _perRow: number | null = null;
  private _bundles: Piece[] | null = null;

  src: string;
  gameLevel: GameLevel;

  constructor(props: BaseEngineProps) {
    const { gameLevel, src } = props;

    this.src = src;
    this.gameLevel = gameLevel;

    this.imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
    this.canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  }

  get pieceSize() {
    return PUZZLE_PIECE_SIZE_MAP[this.gameLevel];
  }

  get perColumn() {
    if (this._perColumn === null) {
      throw new Error("데이터가 초기화되지 않았어요");
    }
    return this._perColumn;
  }

  get perRow() {
    if (this._perRow === null) {
      throw new Error("데이터가 초기화되지 않았어요");
    }
    return this._perRow;
  }

  protected get bundles() {
    if (this._bundles === null) {
      throw new Error("데이터가 초기화되지 않았어요");
    }
    return this._bundles;
  }

  protected get utils() {
    return utils(this);
  }

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.imgElement.complete) {
        this.setup()
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
        return;
      }

      this.imgElement.onload = async () => {
        await this.setup();
        resolve();
      };

      this.imgElement.onerror = error => {
        reject(error);
      };
    });
  }

  private async setup() {
    Paper.setup(this.canvasElement);

    const { perColumn, perRow, pieces } = await this.fetchData();

    this._perColumn = perColumn;
    this._perRow = perRow;
    this._bundles = pieces;

    this.render();

    this.attachMouseEvents();
  }

  private render() {
    this.paperPieceList = [];

    for (let y = 0; y < this.perColumn; y += 1) {
      for (let x = 0; x < this.perRow; x += 1) {
        const index = y * this.perRow + x;
        const fetchedPiece = this.bundles[index];
        if (!fetchedPiece) {
          throw new Error(`${index}에 해당하는 조각이 없어 에러가 발생했어요`);
        }
        const shape = fetchedPiece.shape;
        const mask = getMask({
          shape,
          pieceSize: this.pieceSize,
          imgWidth: this.imgElement.width,
          imgHeight: this.imgElement.height,
        });

        mask.opacity = Styles.MASK_OPACITY;
        mask.strokeColor = new Paper.Color(Styles.MASK_STROKE_COLOR);

        const piece = createPiece({
          mask,
          x,
          y,
          imgElement: this.imgElement,
          pieceSize: this.pieceSize,
        });

        piece.position.x = fetchedPiece.position.x;
        piece.position.y = fetchedPiece.position.y;
        this.paperPieceList.push({ groupId: null, pieceId: this.utils.getPieceId(x, y), piece });
      }
    }
  }

  private attachMouseEvents() {
    this.paperPieceList.forEach(paperPiece => {
      paperPiece.piece.onMouseDown = (event: paper.MouseEvent) => {
        this.onMouseDown({
          event,
          paperPiece,
        });
      };

      paperPiece.piece.onMouseDrag = (event: paper.MouseEvent) => {
        this.onMouseDrag({
          event,
          paperPiece,
        });
      };

      paperPiece.piece.onMouseUp = (event: paper.MouseEvent) => {
        this.onMouseUp({
          event,
          paperPiece,
        });
      };

      paperPiece.piece.onMouseEnter = (event: paper.MouseEvent) => {
        this.onMouseEnter({
          event,
          paperPiece,
        });
      };

      paperPiece.piece.onMouseLeave = (event: paper.MouseEvent) => {
        this.onMouseLeave({
          event,
          paperPiece,
        });
      };
    });
  }

  protected isFullPiece(props: { pieceId: number; neighborPieceId: number; direction: Direction }) {
    const { pieceId, neighborPieceId, direction } = props;
    if (
      !!this.paperPieceList[pieceId] &&
      !!this.paperPieceList[neighborPieceId] &&
      !!this.paperPieceList[pieceId].groupId &&
      this.paperPieceList[pieceId].groupId === this.paperPieceList[neighborPieceId].groupId
    ) {
      return true;
    }
    if (pieceId % this.perRow === 0 && direction === "left") {
      return true;
    } else if (pieceId % this.perRow === this.perRow - 1 && direction === "right") {
      return true;
    } else if (pieceId < this.perRow && direction === "top") {
      return true;
    } else if (pieceId >= this.perRow * (this.perColumn - 1) && direction === "bottom") {
      return true;
    }
    return false;
  }

  abstract fetchData(): Promise<FetchedData>;

  abstract onMouseDown(props: OnMouseEventProps): void;
  abstract onMouseDrag(props: OnMouseEventProps): void;
  abstract onMouseUp(props: OnMouseEventProps): void;
  abstract onMouseEnter(props: OnMouseEventProps): void;
  abstract onMouseLeave(props: OnMouseEventProps): void;
}
