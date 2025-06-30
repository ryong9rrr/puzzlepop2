import { GAME_SERVER_END_POINT } from "../_ep";

export const fetchPuzzleData = async (props: { src: string; level: string }) => {
  const { src, level } = props;

  const response = await window.fetch(`${GAME_SERVER_END_POINT()}/singlegame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ src, level }),
  });
  const { data } = await response.json();
  return data;
};
