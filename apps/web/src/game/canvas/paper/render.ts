import Paper from "paper";
import { getGameStore, PaperPiece } from "@/game/store";
import { createPiece, getMask } from "./renderHelpers";
import { IMG_ID } from "@puzzlepop2/game-core";
import * as Styles from "./styles";
import { getPieceId } from "./utils";
import { attachEvents } from "./events/attachEvents";

export const render = () => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

  const { perColumn, perRow, bundles, pieceSize, setPieces } = getGameStore();

  const pieces: PaperPiece[] = [];
  for (let y = 0; y < perColumn; y += 1) {
    for (let x = 0; x < perRow; x += 1) {
      const index = y * perRow + x;
      const bundle = bundles[index];
      if (!bundle) {
        throw new Error(`${index}에 해당하는 조각이 없어 에러가 발생했어요`);
      }
      const shape = bundle.shape;
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
        imgElement: imgElement,
        pieceSize: pieceSize,
      });

      piece.position.x = bundle.position.x;
      piece.position.y = bundle.position.y;
      pieces.push({ groupId: null, pieceId: getPieceId(x, y), piece });
    }
  }

  setPieces(pieces);
  attachEvents();
};
