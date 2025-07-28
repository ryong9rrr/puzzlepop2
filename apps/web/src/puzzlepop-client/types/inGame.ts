import { BasePuzzleEventData } from "./base";

export type TimeTickData = {
  time: number;
};

export type MoveEventData = {
  message: "MOVE";
} & BasePuzzleEventData;

export type LockedEventData = {
  message: "LOCKED";
} & BasePuzzleEventData;

export type BlockedEventData = {
  message: "BLOCKED";
} & BasePuzzleEventData;

export type UnLockedEventData = {
  message: "UNLOCKED";
} & BasePuzzleEventData;

export type AddPieceEventData = {
  message: "ADD_PIECE";
} & BasePuzzleEventData;
