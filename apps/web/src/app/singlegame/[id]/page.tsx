import { GameLevel } from "@puzzlepop2/game-core";
import { GameClient } from "@puzzlepop2/game-engine-client";
import { fetchGetSingleGamePuzzleById } from "@/remotes/puzzles/singlegame";
import { WindowSizeDetectAndWarningClient } from "@/components/window-size-detect-and-warning-client";

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
      <GameClient gameLevel={level} src={puzzle.src} mode="single" />
      <WindowSizeDetectAndWarningClient />
    </main>
  );
}

export type SearchParams = {
  level?: GameLevel;
};
