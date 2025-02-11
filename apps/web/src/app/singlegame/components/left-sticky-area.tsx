"use client";

import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { SINGLE_PAGE_LEFT_STICKY_AREA_PORTAL_ID } from "../portal-id";
import { usePuzzleStore } from "../stores/puzzleStore";

const _LeftStickyArea = () => {
  const containerRoot = document.getElementById(SINGLE_PAGE_LEFT_STICKY_AREA_PORTAL_ID);
  const { selectedPuzzle } = usePuzzleStore();

  if (!containerRoot) {
    return null;
  }

  return createPortal(
    <Flex direction="column" justify="center" align="center" gapScale={0.5}>
      <Text>퍼즐을 선택하세요!</Text>
      <Text>선택된 퍼즐: {selectedPuzzle?.src || "없음"}</Text>
    </Flex>,
    containerRoot,
  );
};

export const LeftStickyArea = dynamic(() => Promise.resolve(_LeftStickyArea), {
  ssr: false,
  loading: () => <Text>Loading...</Text>,
});
