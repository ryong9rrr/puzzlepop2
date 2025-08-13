import { PaperPiece } from "../../../store";

export type OnMouseEventType = {
  event: paper.MouseEvent;
  paperPiece: PaperPiece;
};
