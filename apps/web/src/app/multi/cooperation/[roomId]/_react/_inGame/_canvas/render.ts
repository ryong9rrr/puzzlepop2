import { canvasStore } from "./store";

export const render = () => {
  const { pieceSize, widthCount, lengthCount, shapes } = canvasStore.getState();

  console.log(pieceSize, widthCount, lengthCount, shapes);
};
