import Paper from "paper";

const 이미지_크기를_늘려서_생긴_잉여_배경_색상 = "rgba(0, 0, 0, 0.4)";

export const extendImage = (props: { imgElement: HTMLImageElement; pieceSize: number }) => {
  const { imgElement, pieceSize } = props;
  const extendedWidth = Math.ceil(imgElement.width / pieceSize) * pieceSize;
  const extendedHeight = Math.ceil(imgElement.height / pieceSize) * pieceSize;
  return { width: extendedWidth, height: extendedHeight };
};

export const resizeImage = (props: {
  imgElement: HTMLImageElement;
  canvasElement: HTMLCanvasElement;
}) => {
  const { imgElement, canvasElement } = props;

  // 여유공간 20% 제외하고 캔버스의 80%만 사용한다
  const width = canvasElement.clientWidth * 0.8;
  const height = canvasElement.clientHeight * 0.8;

  // 이미지의 크기가 충분히 작다면
  if (imgElement.width <= width && imgElement.height <= height) {
    return { width: imgElement.width, height: imgElement.height };
  }
  // 그렇지 않다면 크기 조정
  const scale = Math.min(width / imgElement.width, height / imgElement.height);
  return { width: imgElement.width * scale, height: imgElement.height * scale };
};

export const createResizedImageRaster = (props: {
  imageRaster: paper.Raster;
  pieceSize: number;
  imgElement: HTMLImageElement;
  canvasElement: HTMLCanvasElement;
}) => {
  const { imageRaster, pieceSize, imgElement, canvasElement } = props;
  imageRaster.scale(캔버스의_크기에_맞는_이미지_크기로_조정({ imgElement, canvasElement }));
  return 정사각형으로_잘릴_수_있도록_이미지_크기_늘리기({ imageRaster, pieceSize });
};

const 캔버스의_크기에_맞는_이미지_크기로_조정 = (props: {
  imgElement: HTMLImageElement;
  canvasElement: HTMLCanvasElement;
}) => {
  const { imgElement, canvasElement } = props;

  // 여유공간 20% 제외하고 캔버스의 80%만 사용한다
  const width = canvasElement.clientWidth * 0.8;
  const height = canvasElement.clientHeight * 0.8;

  // 이미지의 크기가 충분히 작다면
  if (imgElement.width <= width && imgElement.height <= height) {
    return 1;
  }
  // 그렇지 않다면 크기 조정
  const scale = Math.min(width / imgElement.width, height / imgElement.height);
  return scale;
};

const 정사각형으로_잘릴_수_있도록_이미지_크기_늘리기 = (props: {
  imageRaster: paper.Raster;
  pieceSize: number;
}) => {
  const { imageRaster, pieceSize } = props;

  const { width: prevWidth, height: prevHeight } = imageRaster.bounds;

  // 정사각형으로 잘릴 수 있도록 크기 조정
  const newWidth = Math.ceil(prevWidth / pieceSize) * pieceSize;
  const newHeight = Math.ceil(prevHeight / pieceSize) * pieceSize;

  const paddedCanvas = document.createElement("canvas");
  paddedCanvas.width = newWidth;
  paddedCanvas.height = newHeight;
  const ctx = paddedCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2d context is null");
  }

  ctx.fillStyle = 이미지_크기를_늘려서_생긴_잉여_배경_색상;
  ctx.fillRect(0, 0, newWidth, newHeight);

  // 기존 이미지를 중앙에 배치
  const offsetX = (newWidth - prevWidth) / 2;
  const offsetY = (newHeight - prevHeight) / 2;
  ctx.drawImage(imageRaster.image, offsetX, offsetY, prevWidth, prevHeight);

  const newRaster = new Paper.Raster(paddedCanvas);
  newRaster.position = Paper.view.center;
  return newRaster;
};
