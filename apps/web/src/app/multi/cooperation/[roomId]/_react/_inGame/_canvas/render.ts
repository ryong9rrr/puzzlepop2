import { canvasStore } from "./store";

export const render = () => {
  const { imgElement, canvasElement, pieceSize, widthCount, lengthCount, shapes } =
    canvasStore.getState();

  console.log(shapes);
};
