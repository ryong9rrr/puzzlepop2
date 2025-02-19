import Paper from "paper";
import { Size, Point } from "paper/dist/paper-core";
import Puzzle from "./index";

const constant = {
  percentageTotal: 100.0,
  borderStrokeWidth: 5,
  tileOpacity: 1,
  maskOpacity: 0.25,
  orgTileLoc: 100,
  //tileMarginX: 0,
  //tileMarginY: 30,
};

let config;

const initConfig = board => {
  config = Puzzle.exportConfig();
  const tileRatio = config.tileWidth / constant.percentageTotal;
  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const shape = config.shapes[y * config.tilesPerRow + x];
      const mask = getMask(
        tileRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        config.tileWidth,
        config.imgWidth,
        config.imgHeight,
      );
      if (mask === undefined) {
        continue;
      }
      mask.opacity = constant.maskOpacity;
      mask.strokeColor = new Paper.Color("#fff");

      const cloneImg = new Paper.Raster();

      const img = getTileRaster(
        cloneImg,
        new Size(config.tileWidth, config.tileWidth),
        new Point(config.tileWidth * x, config.tileWidth * y),
        Math.max(config.imgWidth / config.originWidth, config.imgHeight / config.originHeight),
      );

      const border = mask.clone();
      border.strokeColor = new Paper.Color("#ddd");
      border.strokeWidth = constant.borderStrokeWidth;

      // 피스 생성
      const tile = new Paper.Group([mask, img, border]);
      tile.clipped = true;
      tile.opacity = constant.tileOpacity;
      tile.position = new Point(constant.orgTileLoc, constant.orgTileLoc);
      config.tiles.push(tile);
      config.groupTiles.push([tile, undefined, config.tileIndexes.length]);
      config.groupArr.push(undefined);
      config.tileIndexes.push(config.tileIndexes.length);

      // groupArr, tileIndexes 는 필요없는 것 같다..
      console.log(config.groupTiles);
    }
  }

  // 퍼즐배치
  // for (let y = 0; y < config.tilesPerColumn; y++) {
  //   for (let x = 0; x < config.tilesPerRow; x++) {
  //     const tileIndex = board[y][x].index;
  //     const tile = config.tiles[tileIndex];
  //     tile.position = new Point(board[y][x].position_x, board[y][x].position_y);
  //   }
  // }
  Puzzle.setting({
    ...config,
  });
};

// 들어갔는지 (-1) 나왔는지 (1)에 따라 curvy mask 계산
const getMask = (
  tileRatio,
  topTab,
  rightTab,
  bottomTab,
  leftTab,
  tileWidth,
  imgWidth,
  imgHeight,
) => {
  if (
    topTab === undefined ||
    rightTab === undefined ||
    bottomTab === undefined ||
    leftTab === undefined
  ) {
    return;
  }

  const curvyCoords = [
    0, 0, 35, 15, 37, 5, 37, 5, 40, 0, 38, -5, 38, -5, 20, -20, 50, -20, 50, -20, 80, -20, 62, -5,
    62, -5, 60, 0, 63, 5, 63, 5, 65, 15, 100, 0,
  ];

  const mask = new Paper.Path();
  const topLeftEdge = new Point(-imgWidth / 2, -imgHeight / 2);

  mask.moveTo(topLeftEdge);
  //Top
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 0] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 1] * tileRatio,
    );

    const p2 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 2] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 3] * tileRatio,
    );

    const p3 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 4] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 5] * tileRatio,
    );

    mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
  }

  //Right
  const topRightEdge = new Point(topLeftEdge.x + tileWidth, topLeftEdge.y);
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 1] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 0] * tileRatio,
    );
    const p2 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 3] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 2] * tileRatio,
    );
    const p3 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 5] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 4] * tileRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  //Bottom
  const bottomRightEdge = new Point(topRightEdge.x, topRightEdge.y + tileWidth);
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 0] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 1] * tileRatio,
    );
    const p2 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 2] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 3] * tileRatio,
    );
    const p3 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 4] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 5] * tileRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  //Left
  const bottomLeftEdge = new Point(bottomRightEdge.x - tileWidth, bottomRightEdge.y);
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 1] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 0] * tileRatio,
    );
    const p2 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 3] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 2] * tileRatio,
    );
    const p3 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 5] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 4] * tileRatio,
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  return mask;
};

// 각각의 피스의 raster 반환
const getTileRaster = (sourceRaster, size, offset, scaleValue) => {
  const targetRaster = new Paper.Raster("empty");
  targetRaster.scale(scaleValue);
  targetRaster.position = new Point(-offset.x, -offset.y);

  return targetRaster;
};

const initPuzzle = { initConfig };
export default initPuzzle;
