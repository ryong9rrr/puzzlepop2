import { Combo, Piece, TeamColor } from "./types/base";
import {
  AddPieceEventData,
  BlockedEventData,
  LockedEventData,
  MoveEventData,
  TimeTickData,
  UnLockedEventData,
} from "./types/inGame";

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isGameWaitingState = (gameData: Record<string, unknown>) => {
  return "started" in gameData && gameData["started"] === false;
};

export const isGameFinishState = (gameData: Record<string, unknown>) => {
  return "finished" in gameData && gameData["finished"] === true;
};

export const isTimeTickData = (gameData: Record<string, unknown>): gameData is TimeTickData => {
  return !!gameData.time && Object.keys(gameData).length === 1;
};

export const hasPuzzleData = (gameData: Record<string, unknown>) => {
  return !!gameData.redPuzzle && !!gameData.bluePuzzle;
};

export const isMoveEvent = (gameData: Record<string, unknown>): gameData is MoveEventData => {
  return !!gameData.message && gameData.message === "MOVE";
};

export const isLockedEvent = (gameData: Record<string, unknown>): gameData is LockedEventData => {
  return !!gameData.message && gameData.message === "LOCKED";
};

export const isBlockedEvent = (gameData: Record<string, unknown>): gameData is BlockedEventData => {
  return !!gameData.message && gameData.message === "BLOCKED";
};

export const isUnLockedEvent = (
  gameData: Record<string, unknown>,
): gameData is UnLockedEventData => {
  return !!gameData.message && gameData.message === "UNLOCKED";
};

export const hasBundlesData = (
  gameData: Record<string, unknown>,
): gameData is {
  redBundles: Piece[][] | null;
  blueBundles: Piece[][] | null;
  senderId: string;
} => {
  return "redBundles" in gameData && "blueBundles" in gameData && "senderId" in gameData;
};

export const isAddPieceEvent = (
  gameData: Record<string, unknown>,
): gameData is AddPieceEventData => {
  return !!gameData.message && gameData.message === "ADD_PIECE";
};

export const hasComboData = (
  gameData: Record<string, unknown>,
): gameData is { combo: Combo[] | null; comboCnt: number | null; team: TeamColor } => {
  return "combo" in gameData && "comboCnt" in gameData && "team" in gameData;
};
