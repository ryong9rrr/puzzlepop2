import { PaperPiece } from "../types";

export type OnMoveMouseEventProps = {
  event: paper.MouseEvent;
  paperPieceList: PaperPiece[];
  paperPiece: PaperPiece;
};

export type onMoveMouseDragProps = {
  pieceSize: number;
} & OnMoveMouseEventProps;
