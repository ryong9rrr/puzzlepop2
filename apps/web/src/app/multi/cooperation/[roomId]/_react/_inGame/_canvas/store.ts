import { createStore } from "zustand/vanilla";
import { MultiGamePuzzlePiece, Shape } from "@puzzlepop2/game-core";

import { LoadProps } from "./load";

import { createShapes } from "./createShapes";

interface CanvasStore {
  imgElement: HTMLImageElement | null;
  canvasElement: HTMLCanvasElement | null;
  widthCount: LoadProps["widthCount"];
  lengthCount: LoadProps["lengthCount"];
  pieceSize: LoadProps["pieceSize"];
  bundles: LoadProps["bundles"];

  reset: () => void;

  init: (props: {
    imgElement: HTMLImageElement;
    canvasElement: HTMLCanvasElement;
    widthCount: LoadProps["widthCount"];
    lengthCount: LoadProps["lengthCount"];
    pieceSize: LoadProps["pieceSize"];
    bundles: LoadProps["bundles"];
  }) => void;

  shapes: Shape[];
  initShapes: (board: MultiGamePuzzlePiece[][]) => void;
}

export const canvasStore = createStore<CanvasStore>((set, get) => ({
  imgElement: null,
  canvasElement: null,
  widthCount: 0,
  lengthCount: 0,
  pieceSize: 0,
  bundles: [],

  reset: () => {
    set({
      imgElement: null,
      canvasElement: null,
      widthCount: 0,
      lengthCount: 0,
      pieceSize: 0,
      bundles: [],
    });
  },

  init: props => {
    const { imgElement, canvasElement, widthCount, lengthCount, pieceSize, bundles } = props;
    set({
      imgElement,
      canvasElement,
      widthCount,
      lengthCount,
      pieceSize,
      bundles,
    });
  },

  shapes: [],
  initShapes: board => {
    const { shapes: prevShapes, widthCount, lengthCount } = get();
    if (prevShapes) {
      return;
    }
    const shapes = createShapes({ board, widthCount, lengthCount });
    set({ shapes });
  },
}));
