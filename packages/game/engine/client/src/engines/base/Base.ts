import Paper from "paper";
import { CANVAS_ID, GameLevel, IMG_ID, PUZZLE_PIECE_SIZE_MAP } from "@puzzlepop2/game-core";
import { getMask, createPiece } from "./render";
import { PaperPiece, BaseEngineProps, FetchedData } from "./types";
import * as Styles from "./styles";
import { onMoveMouseDown, onMoveMouseDrag } from "./mouse-events/move";

export abstract class BaseEngine {
  protected imgElement: HTMLImageElement;
  protected canvasElement: HTMLCanvasElement;
  protected paperPieceList: PaperPiece[] = [];

  protected fetchedData: FetchedData | null = null;

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

  protected get perColumn() {
    if (!this.fetchedData) {
      throw new Error("fetchedData is null");
    }
    return this.fetchedData.perColumn;
  }

  protected get perRow() {
    if (!this.fetchedData) {
      throw new Error("fetchedData is null");
    }
    return this.fetchedData.perRow;
  }

  protected get pieces() {
    if (!this.fetchedData) {
      throw new Error("fetchedData is null");
    }
    return this.fetchedData.pieces;
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

    this.fetchedData = await this.fetchData();

    this.render();

    this.attachMouseEvents();
  }

  private render() {
    for (let y = 0; y < this.perColumn; y += 1) {
      for (let x = 0; x < this.perRow; x += 1) {
        const index = y * this.perRow + x;
        const fetchedPiece = this.pieces[index];
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
        this.paperPieceList.push({ groupId: null, pieceId: y * this.perRow + x, piece });
      }
    }
  }

  private attachMouseEvents() {
    this.paperPieceList.forEach(paperPiece => {
      paperPiece.piece.onMouseDown = (event: paper.MouseEvent) => {
        onMoveMouseDown({
          event,
          paperPieceList: this.paperPieceList,
          paperPiece,
        });
      };

      paperPiece.piece.onMouseDrag = (event: paper.MouseEvent) => {
        onMoveMouseDrag({
          event,
          paperPieceList: this.paperPieceList,
          paperPiece,
          pieceSize: this.pieceSize,
        });
      };

      // paperPiece.piece.onMouseUp = (event: paper.MouseEvent) => {};

      // paperPiece.piece.onMouseEnter = (event: paper.MouseEvent) => {};

      // paperPiece.piece.onMouseLeave = (event: paper.MouseEvent) => {};
    });
  }

  abstract fetchData(): Promise<FetchedData>;
}
