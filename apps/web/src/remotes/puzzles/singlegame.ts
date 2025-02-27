import { GameLevel } from "@puzzlepop2/game-core";
import { getRestServerUrl } from "../end-point";
import { Puzzle } from "./types";

type FetchGetSingleGamePuzzleListRequest = {
  nextCursor: string;
};

type FetchGetSingleGamePuzzleListResponse = {
  data: Puzzle[];
  nextCursor: string | null;
};

export const fetchGetSingleGamePuzzleList = async ({
  nextCursor,
}: FetchGetSingleGamePuzzleListRequest) => {
  const LIMIT = 8;
  const response = await fetch(
    `${getRestServerUrl()}/puzzles?limit=${LIMIT}${nextCursor ? `&cursor=${nextCursor}` : ""}`,
  );
  const { data } = await response.json();

  const result: FetchGetSingleGamePuzzleListResponse = {
    data: data.puzzleList,
    nextCursor: data.nextCursor,
  };
  return result;
};

type FetchGetSingleGamePuzzleByIdRequest = {
  id: string;
  level: GameLevel;
};

type FetchGetSingleGamePuzzleByIdResponse = {
  level: GameLevel;
  src: string;
} & Puzzle;

export const fetchGetSingleGamePuzzleById = async ({
  id,
  level,
}: FetchGetSingleGamePuzzleByIdRequest) => {
  const response = await fetch(`${getRestServerUrl()}/puzzles/${id}?level=${level}`);
  const { data } = await response.json();
  return data as FetchGetSingleGamePuzzleByIdResponse;
};
