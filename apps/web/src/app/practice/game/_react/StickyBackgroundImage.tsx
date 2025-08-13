"use client";

import { StickyBackground } from "@shared-components/StickyBackground";
import * as CDN from "@remotes-cdn/images";

import { useSelectPuzzleStore } from "./useSelectPuzzleStore";

export const StickyBackgroundImage = () => {
  const { selectedPuzzle } = useSelectPuzzleStore();

  return (
    <StickyBackground.Background
      src={selectedPuzzle ? selectedPuzzle.originImgSrc : CDN.SINGLE_GAME_BACKGROUND}
    />
  );
};
