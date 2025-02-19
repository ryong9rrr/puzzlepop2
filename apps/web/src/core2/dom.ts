export const IMG_ID = "puzzle-image";
export const CANVAS_ID = "puzzle-canvas";

export const queryImageElement = () => {
  if (typeof window === "undefined") {
    throw new Error("클라이언트 사이드에서 실행해주세요");
  }
  const imgElement = window.document.querySelector(`#${IMG_ID}`);
  if (!imgElement || !(imgElement instanceof HTMLImageElement)) {
    throw new Error(`id가 ${IMG_ID}인 'img' dom element를 찾을 수 없습니다.`);
  }
  return imgElement;
};

export const queryCanvasElement = () => {
  if (typeof window === "undefined") {
    throw new Error("클라이언트 사이드에서 실행해주세요");
  }
  const canvasElement = window.document.querySelector(`#${CANVAS_ID}`);
  if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
    throw new Error(`id가 ${CANVAS_ID}인 'canvas' dom element를 찾을 수 없습니다.`);
  }
  return canvasElement;
};
