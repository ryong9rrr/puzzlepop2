import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  IMG_ID,
  SingleGameLevelType,
} from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import { fetchGetSingleGamePuzzleById } from "@remotes-single-rest/singleGame/apis";

import { GameClient } from "./_gameClient/GameClient";

export type SearchParams = {
  level?: SingleGameLevelType;
};

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
    <ToastClient>
      <IsMobileWarningToast />

      <FullScreenBackground.Main>
        <FullScreenBackground.Background src={puzzle.src} />
        <img id={IMG_ID} alt="" src={puzzle.src} style={{ display: "none" }} />
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <canvas
            id={CANVAS_ID}
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${CANVAS_HEIGHT}px`,
              backgroundColor: vars.colors.grey[50],
              borderRadius: "0.25rem",
              opacity: 0.8,
              border: `3px solid ${vars.colors.grey[500]}`,
            }}
          ></canvas>
        </Flex>
        <GameClient level={level} src={puzzle.src} mode="single" />
      </FullScreenBackground.Main>
    </ToastClient>
  );
}
