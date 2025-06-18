"use client";

import { useSingleGamePage } from "../store";
import { BackgroundSticky as BgSticky } from "@/components/backgrounds";
import * as CDN from "@/constants/cdn";

export const BackgroundSticky = () => {
  const { selectedPuzzle } = useSingleGamePage();

  return (
    <BgSticky.Background
      src={selectedPuzzle ? selectedPuzzle.imgUrl : CDN.SINGLE_GAME_BACKGROUND}
    />
  );
};
