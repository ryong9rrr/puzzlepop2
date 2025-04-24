import Paper from "paper";
import { CANVAS_ID } from "@puzzlepop2/game-core";
import { render } from "./paper/render";

export const setup = () => {
  const canvasElement = window.document.getElementById(CANVAS_ID) as HTMLCanvasElement;

  Paper.setup(canvasElement);
  render();
};
