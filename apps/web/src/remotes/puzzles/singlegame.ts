import { SingleGamePuzzle } from "@puzzlepop2/game";
import { getRestServerUrl } from "../end-point";

type FetchGetSingleGamePuzzleList = {
  page?: number;
};

export const fetchGetSingleGamePuzzleList = async (props?: FetchGetSingleGamePuzzleList) => {
  const response = await fetch(`${getRestServerUrl()}/puzzles?page=${props?.page || 1}`);
  const { data } = await response.json();
  return data as SingleGamePuzzle[];
};
