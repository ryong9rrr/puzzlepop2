export const createRandomPosition = (props: {
  canvasElement: HTMLCanvasElement;
  pieceSize: number;
}) => {
  const { canvasElement, pieceSize } = props;

  const x1 = pieceSize;
  const y1 = pieceSize;
  const x2 = canvasElement.clientWidth - pieceSize;
  const y2 = canvasElement.clientHeight - pieceSize;

  return {
    x: Math.random() * (x2 - x1) + x1,
    y: Math.random() * (y2 - y1) + y1,
  };
};
