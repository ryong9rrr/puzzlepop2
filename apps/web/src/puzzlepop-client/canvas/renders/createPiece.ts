import Paper from "paper";
import { IMG_ID } from "@puzzlepop2/game-core";

import * as Styles from "./styles";
import { canvasStaticStore } from "../canvasStaticStore";
import { getRenderingData } from "./getRenderingData";

type Params = {
  mask: paper.Path;
  x: number;
  y: number;
};

export const createPiece = (params: Params) => {
  const { mask, x, y } = params;
  const {
    initData: { pieceSize },
  } = canvasStaticStore.getState();

  const offset = new Paper.Point(pieceSize * x, pieceSize * y);

  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

  const { pieceScaleValue } = getRenderingData();

  const pieceRaster = new Paper.Raster(imgElement);
  pieceRaster.position = Paper.view.center;
  pieceRaster.scale(pieceScaleValue);

  // 여기서 x, y에 의해 조각이 렌더링할 "부분"이 결정됨
  pieceRaster.position = new Paper.Point(-offset.x, -offset.y);

  const border = mask.clone();
  border.strokeColor = new Paper.Color(Styles.BORDER_STROKE_COLOR);
  border.strokeWidth = Styles.BORDER_STROKE_WIDTH;

  const piece = new Paper.Group([mask, pieceRaster, border]);
  piece.clipped = true;
  piece.opacity = Styles.PIECE_OPACITY;
  return piece;
};
