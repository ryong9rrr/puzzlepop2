import Puzzle from "./index";
import initPuzzle from "./ConfigInit";

let config;

export const createTiles = (shapes, board) => {
  config = Puzzle.exportConfig();
  if (shapes && Array.isArray(shapes)) {
    // getRandomShapes();
    config.shapes = shapes;
  } else {
    getRandomShapes();
  }
  initPuzzle.initConfig(board);
};

// 모든 피스에 대해 랜덤 모양 결정
// 차후에 API 붙이면 필요없어짐
const getRandomShapes = () => {
  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      let topTab;
      let rightTab;
      let bottomTab;
      let leftTab;

      if (y === 0) {
        topTab = 0;
      }
      if (y === config.tilesPerColumn - 1) {
        bottomTab = 0;
      }
      if (x === 0) {
        leftTab = 0;
      }
      if (x === config.tilesPerRow - 1) {
        rightTab = 0;
      }

      config.shapes.push({
        topTab: topTab,
        rightTab: rightTab,
        bottomTab: bottomTab,
        leftTab: leftTab,
      });
    }
  }

  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const shape = config.shapes[y * config.tilesPerRow + x];

      const shapeRight =
        x < config.tilesPerRow - 1 ? config.shapes[y * config.tilesPerRow + (x + 1)] : undefined;

      const shapeBottom =
        y < config.tilesPerColumn - 1 ? config.shapes[(y + 1) * config.tilesPerRow + x] : undefined;

      config.shapes[y * config.tilesPerRow + x].rightTab =
        x < config.tilesPerRow - 1 ? getRandomTabValue() : shape.rightTab;

      if (shapeRight && shape.rightTab !== undefined) {
        shapeRight.leftTab = -shape.rightTab;
      }

      config.shapes[y * config.tilesPerRow + x].bottomTab =
        y < config.tilesPerColumn - 1 ? getRandomTabValue() : shape.bottomTab;

      if (shapeBottom && shape.bottomTab !== undefined) {
        shapeBottom.topTab = -shape.bottomTab;
      }
    }
  }
};

// -1 or 1 (들어간 모양인지 나온 모양인지) 결정
const getRandomTabValue = () => {
  return Math.pow(-1, Math.floor(Math.random() * 2));
};
