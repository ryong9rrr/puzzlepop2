import { GameLevel } from "./types";

export const IMG_ID = "puzzlepop-image";
export const CANVAS_ID = "puzzlepop-canvas";
export const CANVAS_WIDTH = 1000; // 아이패드 미니 가로 기준
export const CANVAS_HEIGHT = 750; // 아이패드 미니 세로 기준

// 아래 크기는 캔버스의 너비, 높이에 따른 기준으로 결정되었음.
export const PUZZLE_IMAGE_SIZE_MAP: Record<GameLevel, { width: number; height: number }> = {
  easy: { width: 800, height: 500 }, // 100x100 조각으로 정확히 나눠질 수 있는 크기
  normal: { width: 800, height: 480 }, // 80x80 조각으로 정확히 나눠질 수 있는 크기
  hard: { width: 800, height: 450 }, // 50x50 조각으로 정확히 나눠질 수 있는 크기
};

export const PUZZLE_PIECE_SIZE_MAP: Record<GameLevel, number> = {
  easy: 100,
  normal: 80,
  hard: 50,
};
