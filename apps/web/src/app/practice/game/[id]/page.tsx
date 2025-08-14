import { vars } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import { getHttpEndPoint } from "@remotes-web/endPoints";

import { PracticePuzzle } from "../../apis/types";
import { PracticeGameLevel } from "./_react/PracticeGameClients/types";
import { GameClient } from "./_react/PracticeGameClients/GameClient";
import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  IMG_ID,
} from "./_react/PracticeGameClients/constants";

export type SearchParams = {
  level?: PracticeGameLevel;
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

  const puzzle = await safeFetch(id);

  if (!puzzle) {
    throw new Error("Invalid id");
  }

  return (
    <FullScreenBackground.Main>
      <ToastClient>
        <IsMobileWarningToast />
      </ToastClient>
      <FullScreenBackground.Background src={puzzle.originImgSrc} />
      <img id={IMG_ID} alt="" src={puzzle.originImgSrc} style={{ display: "none" }} />
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
      <GameClient level={level} src={puzzle.originImgSrc} />
    </FullScreenBackground.Main>
  );
}

const safeFetch = async (id: string) => {
  const response = await fetch(`${getHttpEndPoint()}/practice/apis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "GET_PUZZLE_BY_ID",
      id,
    }),
  });

  if (response.status === 200) {
    const { data } = await response.json();
    return data as PracticePuzzle;
  }

  return null;
};
