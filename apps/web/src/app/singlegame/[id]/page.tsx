import { redirect } from "next/navigation";
import { vars } from "@puzzlepop2/themes";
import { fetchGetSingleGamePuzzleById } from "@/remotes/puzzles/singlegame";
import { IMG_ID, CANVAS_ID } from "@/core/dom";
import { PuzzleClient } from "@/core2";
import { GameLevel } from "@puzzlepop2/game-core";
//import { PuzzleClient } from "./components/puzzle-client";

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
  return <PuzzleClient src={puzzle.src} />;

  // return (
  //   <>
  //     {/* eslint-disable-next-line */}
  //     <img id={IMG_ID} src={puzzle.src} alt="" style={{ display: "none" }} />
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         padding: "1rem",
  //       }}
  //     >
  //       <canvas
  //         id={CANVAS_ID}
  //         style={{
  //           width: "100%",
  //           height: "calc(100vh - 2rem)",
  //           backgroundColor: vars.colors.white,
  //         }}
  //       />
  //     </div>
  //     <PuzzleClient />
  //   </>
  // );
}

export type SearchParams = {
  level?: GameLevel;
};
