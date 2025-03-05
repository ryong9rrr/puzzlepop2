import { GameLevel, Piece } from "@puzzlepop2/game-core";
import { getGameServerUrl } from "../../end-point";

export const fetchData = async (props: { src: string; level: GameLevel }) => {
  const { src, level } = props;
  const response = await window.fetch(`${getGameServerUrl()}/singlegame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ src, level }),
  });

  const { data } = await response.json();

  return data as { pieces: Piece[]; perColumn: number; perRow: number };
};
