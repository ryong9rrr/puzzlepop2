const $ = <T extends HTMLElement>(domId: string) => window.document.querySelector(domId) as T;

export const IMG_ID = "puzzle-image";
export const CANVAS_ID = "puzzle-canvas";

export const queryImageElement = () => $(`#${IMG_ID}`) as HTMLImageElement;
export const queryCanvasElement = () => $(`#${CANVAS_ID}`) as HTMLCanvasElement;
