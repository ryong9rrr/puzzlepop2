"use client";

import { StickyBackgroundImage as SharedStickyBackgroundImage } from "@shared-components/BackgroundImages/StickyBackgroundImage";
import * as CDN from "@remotes-cdn/images";

import { useSelectPuzzleStore } from "./selectPuzzleStore";

export const StickyBackgroundImage = () => {
  const { selectedPuzzle } = useSelectPuzzleStore();

  return (
    <SharedStickyBackgroundImage.Background
      src={selectedPuzzle ? selectedPuzzle.imgUrl : CDN.SINGLE_GAME_BACKGROUND}
    />
  );
};
