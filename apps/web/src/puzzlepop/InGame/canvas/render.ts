import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import { IMG_ID } from "@puzzlepop2/game-core";

import { Piece } from "../../types/base";

import { attachEvents } from "./attachEvents";
import { CanvasPiece, canvasStaticStore } from "./canvasStaticStore";

import * as Styles from "./renders/styles";
import { createMask } from "./renders/createMask";
import { createPiece } from "./renders/createPiece";
import { reGroupForBundles } from "./utils/reGroupForBundles";

export const render = (board: Piece[][]) => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

  if (!imgElement) {
    throw new Error("이미지 엘리먼트가 존재하지 않습니다.");
  }

  const {
    initData: { widthCount, lengthCount, shapes, me },
    redBundles,
    blueBundles,
    setRedPieces,
    setBluePieces,
  } = canvasStaticStore.getState();

  const pieces: CanvasPiece[] = [];
  for (let y = 0; y < lengthCount; y += 1) {
    for (let x = 0; x < widthCount; x += 1) {
      const index = y * widthCount + x;

      const shape = shapes[index];
      if (!shape) {
        console.error(`Index ${index}에 해당하는 조각이 없습니다.`);
        return;
      }

      const mask = createMask(shape);

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

  const setPieces = me.team === "RED" ? setRedPieces : setBluePieces;
  setPieces(pieces);
  attachEvents();

  const bundles = me.team === "RED" ? redBundles : blueBundles;
  reGroupForBundles(bundles, me.team);
};
