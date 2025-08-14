import Paper from "paper";

import { CANVAS_ID } from "../constants";

export const setup = () => {
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  Paper.setup(canvasElement as HTMLCanvasElement);
};
