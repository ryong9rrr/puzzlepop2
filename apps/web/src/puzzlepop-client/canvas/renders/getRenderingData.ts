import { IMG_ID } from "../../constants";

import { canvasStaticStore } from "../canvasStaticStore";

// level 임의로 3단계로
const LEVEL_SIZE_MAP = { 1: 400, 2: 500, 3: 600 };

export const getRenderingData = () => {
  const {
    initData: { level },
  } = canvasStaticStore.getState();

  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

  const _level = guardLevel(level);

  const imgWidth =
    imgElement.height >= imgElement.width
      ? Math.round((LEVEL_SIZE_MAP[_level] * imgElement.width) / imgElement.height / 100) * 100
      : LEVEL_SIZE_MAP[_level];

  const imgHeight =
    imgElement.height >= imgElement.width
      ? LEVEL_SIZE_MAP[_level]
      : Math.round((LEVEL_SIZE_MAP[_level] * imgElement.height) / imgElement.width / 100) * 100;

  const pieceScaleValue = Math.max(imgWidth / imgElement.width, imgHeight / imgElement.height);

  return {
    imgElement,
    imgWidth,
    imgHeight,
    pieceScaleValue,
  };
};

const guardLevel = (level: number): keyof typeof LEVEL_SIZE_MAP => {
  if (level < 1 || level > 3) {
    console.warn(`Invalid level: ${level}. Defaulting to level 1.`);
    return 1;
  }
  return level as keyof typeof LEVEL_SIZE_MAP;
};
