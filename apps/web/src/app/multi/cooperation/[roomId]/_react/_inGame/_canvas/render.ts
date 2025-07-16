import Paper from "paper";

import { IMG_ID, MultiGamePuzzlePiece } from "@puzzlepop2/game-core";
import { canvasStore } from "./stores/canvasStore";
import { getMask } from "./renders/getMask";
import * as Styles from "./renders/styles";
import { createPiece } from "./renders/createPiece";
import { Point } from "paper/dist/paper-core";
import { Piece, pieceStore } from "./stores/pieceStore";
import { attachEvents } from "./attachEvents";

export const render = (board: MultiGamePuzzlePiece[][], bundles: unknown[][] = []) => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
  const { pieceSize, widthCount, lengthCount, shapes } = canvasStore.getState();

  if (!imgElement) {
    throw new Error("이미지 엘리먼트가 존재하지 않습니다.");
  }

  const pieces: Piece[] = [];
  for (let y = 0; y < lengthCount; y += 1) {
    for (let x = 0; x < widthCount; x += 1) {
      const index = y * widthCount + x;

      const shape = shapes[index];
      if (!shape) {
        console.error(`Index ${index}에 해당하는 조각이 없습니다.`);
        return;
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

      pieces.push({
        groupId: null,
        index,
        paperGroup: piece,
      });
    }
  }

  const { setPieces } = pieceStore.getState();
  setPieces(pieces);
  attachEvents();
};
