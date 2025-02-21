import { getRestServerUrl } from "../end-point";
import { SingleGamePuzzle } from "./types";

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
    data: SingleGamePuzzle[];
    nextCursor: string | null;
  };
};

export const fetchGetSingleGamePuzzleById = async ({ id }: { id: string }) => {
  const response = await fetch(`${getRestServerUrl()}/puzzles/${id}`);
  const { data } = await response.json();
  return data as SingleGamePuzzle;
};
