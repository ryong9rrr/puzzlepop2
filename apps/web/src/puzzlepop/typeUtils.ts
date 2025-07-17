export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isWaiting = (gameData: Record<string, unknown>) => {
  return "started" in gameData && gameData["started"] === false;
};

export const isFinished = (gameData: Record<string, unknown>) => {
  return "finished" in gameData && gameData["finished"] === true;
};

export const hasTime = (gameData: Record<string, unknown>) => {
  return "time" in gameData && !Number.isNaN(Number(gameData["time"]));
};

export const hasPuzzle = (gameData: Record<string, unknown>) => {
  return "redPuzzle" in gameData && "bluePuzzle" in gameData;
};
