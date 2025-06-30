import { GameLevel } from "@puzzlepop2/game-core";
import { Puzzle } from "@shared-types/single";

import { REST_SERVER_END_POINT } from "../_ep";

export const fetchGetSingleGamePuzzleList = async ({ nextCursor }: { nextCursor: string }) => {
  const LIMIT = 8;
  const response = await fetch(
    `${REST_SERVER_END_POINT()}/puzzles?limit=${LIMIT}${nextCursor ? `&cursor=${nextCursor}` : ""}`,
  );
  const { data } = await response.json();

  const result: { data: Puzzle[]; nextCursor: string | null } = {
    data: data.puzzleList,
    nextCursor: data.nextCursor,
  };
  return result;
};

export const fetchGetSingleGamePuzzleById = async ({
  id,
  level,
}: {
  id: string;
  level: GameLevel;
}) => {
  const response = await fetch(`${REST_SERVER_END_POINT()}/puzzles/${id}?level=${level}`);
  const { data } = await response.json();
  return data as {
    level: GameLevel;
    src: string;
  } & Puzzle;
};
