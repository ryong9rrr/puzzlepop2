import { redirect } from "next/navigation";
import { vars } from "@puzzlepop2/themes";
import { fetchGetSingleGamePuzzleById } from "@/remotes/puzzles/singlegame";
import { IMG_ID, CANVAS_ID } from "@/core/dom";
import { PuzzleClient } from "@/core2";
//import { PuzzleClient } from "./components/puzzle-client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {
    const puzzle = await fetchGetSingleGamePuzzleById({ id });

    return <PuzzleClient src={puzzle.imgUrl} />;

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
    // eslint-disable-next-line
  } catch (error) {
    redirect("/singlegame");
  }
}
