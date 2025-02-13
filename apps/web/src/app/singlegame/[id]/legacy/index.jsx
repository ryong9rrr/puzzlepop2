import MovePuzzle from "./MovePuzzle";

let config;
let gIndex;

// puzzle 객체 config setting
const setting = conf => {
  config = { ...conf };
  if (!isNaN(gIndex)) {
    config.groupTileIndex = gIndex;
  }
};

// puzzle 객체의 특정 값 변경
const settingValue = (key, value) => {
  config[key] = value;
};

// puzzle 객체 config export
const exportConfig = () => config;

const move = () => {
  MovePuzzle.moveTile();
  MovePuzzle.findNearTileGroup();
};

const Puzzle = {
  setting,
  settingValue,
  exportConfig,
  move,
};

export default Puzzle;
