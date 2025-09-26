import { CANVAS_ID } from "../../constants";
import { CanvasPiece, canvasStaticStore } from "../canvasStaticStore";

export const onMouseEnter = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;

  if (!canvasElement) {
    return;
  }

  const {
    isLock,
    initData: { me },
  } = canvasStaticStore.getState();

  if (isLock(me.team, piece.index)) {
    canvasElement.style.cursor = "not-allowed";
  } else {
    canvasElement.style.cursor = "pointer";
  }
};
