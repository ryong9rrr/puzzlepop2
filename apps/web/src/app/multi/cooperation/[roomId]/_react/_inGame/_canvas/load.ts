import Paper from "paper";
import { CANVAS_ID, IMG_ID } from "@puzzlepop2/game-core";

import { render } from "./render";

export const load = () => {
  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

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

const setup = () => {
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  Paper.setup(canvasElement as HTMLCanvasElement);
  render();
};
