import Paper from "paper";

import { IMG_ID, MultiGamePuzzlePiece } from "@puzzlepop2/game-core";
import { canvasStore } from "./store";
import { getMask } from "./renders/getMask";
import * as Styles from "./renders/styles";
import { createPiece } from "./renders/createPiece";
import { Point } from "paper/dist/paper-core";

export const render = (board: MultiGamePuzzlePiece[][], bundles: unknown[][] = []) => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
  const { pieceSize, widthCount, lengthCount, shapes } = canvasStore.getState();

  if (!imgElement) {
    console.log("아직 이미지가 로드되지 않았어요");
    return;
  }

  for (let y = 0; y < lengthCount; y += 1) {
    for (let x = 0; x < widthCount; x += 1) {
      const shape = shapes[y * widthCount + x];
      if (!shape) {
        throw new Error(`${y * widthCount + x}에 해당하는 조각이 없어 에러가 발생했어요`);
      }

      const mask = getMask({
        shape,
        pieceSize,
        imgWidth: imgElement.width,
        imgHeight: imgElement.height,
      });

      mask.opacity = Styles.MASK_OPACITY;
      mask.strokeColor = new Paper.Color(Styles.MASK_STROKE_COLOR);

      const piece = createPiece({
        mask,
        x,
        y,
      });

      piece.position = new Point(board[y][x].position_x, board[y][x].position_y);
    }
  }
};
