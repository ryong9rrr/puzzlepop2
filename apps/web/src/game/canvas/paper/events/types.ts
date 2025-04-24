import { PaperPiece } from "@/game/store";

export type OnMouseEventType = {
  event: paper.MouseEvent;
  paperPiece: PaperPiece;
};
