import Paper from "paper";
import { Bundle, CANVAS_ID, IMG_ID } from "@puzzlepop2/game-core";

import { canvasStore } from "./store";
import { render } from "./render";

export interface LoadProps {
  widthCount: number;
  lengthCount: number;
  pieceSize: number;
  bundles: Bundle[];
}

export const load = (props: LoadProps) => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;

  if (!validate(props)) {
    console.log("유효하지 않은 props", props);
    return Promise.reject();
  }

  if (!imgElement || !canvasElement) {
    console.log("imgElement or canvasElement is null");
    return Promise.reject();
  }

  const { pieceSize, widthCount, lengthCount, bundles } = props;
  const { init } = canvasStore.getState();
  init({
    imgElement,
    canvasElement,
    pieceSize,
    widthCount,
    lengthCount,
    bundles,
  });

  return new Promise((resolve, reject) => {
    if (imgElement.complete) {
      console.log("Image already loaded");
      setup();
      resolve(() => {});
      return;
    }

    imgElement.onload = () => {
      console.log("Image loaded successfully");
      setup();
      resolve(() => {});
    };

    imgElement.onerror = error => {
      console.error("Error loading image", error);
      reject(error);
    };
  });
};

const validate = (props: LoadProps) => {
  const { pieceSize, bundles, widthCount, lengthCount } = props;

  if (!isNumber(pieceSize) || !isNumber(widthCount) || !isNumber(lengthCount)) {
    return false;
  }

  if (pieceSize <= 0 || widthCount <= 0 || lengthCount <= 0) {
    return false;
  }

  // TODO: bundles는 나중에 확인
  return true;
};

const setup = () => {
  const { canvasElement } = canvasStore.getState();
  Paper.setup(canvasElement as HTMLCanvasElement);
  render();
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(Number(value));
};
