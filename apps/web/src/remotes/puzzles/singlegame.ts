import { GameLevel } from "@puzzlepop2/game-core";
import { getRestServerUrl } from "../end-point";
import { SingleGamePuzzle, Puzzle } from "./types";

export const fetchGetSingleGamePuzzleList = async ({ nextCursor }: { nextCursor: string }) => {
  const LIMIT = 8;
  const response = await fetch(
    `${getRestServerUrl()}/puzzles?limit=${LIMIT}${nextCursor ? `&cursor=${nextCursor}` : ""}`,
  );
  const { data } = await response.json();
  return {
    data: data.puzzleList,
    nextCursor: data.nextCursor,
  } as {
    data: Puzzle[];
    nextCursor: string | null;
  };
};

export const fetchGetSingleGamePuzzleById = async ({
  id,
  level,
}: {
  id: string;
  level: GameLevel;
}) => {
  const response = await fetch(`${getRestServerUrl()}/puzzles/${id}?level=${level}`);
  const { data } = await response.json();
  return data as SingleGamePuzzle;
};
