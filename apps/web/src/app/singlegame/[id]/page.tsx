import {
  GameLevel,
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  GameMode,
  IMG_ID,
} from "@puzzlepop2/game-core";
import { fetchGetSingleGamePuzzleById } from "@/remotes/puzzles/singlegame";
import { WindowSizeDetectAndWarningClient } from "@/components/window-size-detect-and-warning-client";
import { GameClient } from "@/game/GameClient";
import { vars } from "@puzzlepop2/themes";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const id = (await params).id;
  const level = (await searchParams).level;

  if (level !== "easy" && level !== "normal" && level !== "hard") {
    throw new Error("Invalid level");
  }

  const puzzle = await fetchGetSingleGamePuzzleById({ id, level });

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img id={IMG_ID} src={puzzle.src} style={{ display: "none" }} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          backgroundColor: vars.colors.grey["200"],
        }}
      ></canvas>
      <GameClient level={level} src={puzzle.src} mode="single" />
      <WindowSizeDetectAndWarningClient />
    </main>
  );
}

export type SearchParams = {
  level?: GameLevel;
};
