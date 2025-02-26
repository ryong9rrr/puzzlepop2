import { GameLevel } from "@puzzlepop2/game-core";
import { fetchGetSingleGamePuzzleById } from "@/remotes/puzzles/singlegame";
import { PuzzleClient } from "@/core3";

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
      <PuzzleClient
        gameLevel={puzzle.level}
        perColumn={puzzle.perColumn}
        perRow={puzzle.perRow}
        pieces={puzzle.pieces}
        src={puzzle.src}
      />
    </main>
  );
}

export type SearchParams = {
  level?: GameLevel;
};
