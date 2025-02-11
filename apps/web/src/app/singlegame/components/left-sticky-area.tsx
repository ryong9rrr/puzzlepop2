"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Lottie } from "@/components/lottie";
import { usePuzzleStore } from "../stores/puzzleStore";

export const LeftStickyArea = () => {
  const { selectedPuzzle } = usePuzzleStore();

  if (!selectedPuzzle) {
    return (
      <Flex direction="column" align="center" gapScale={0.5}>
        <Spacing scale={7} />
        <Text size="lg" className="font-gameBasic">
          퍼즐을 선택하세요 !
        </Text>
        <Spacing scale={2} />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "-5rem", left: "-6rem" }}>
            <Lottie
              src="/lotties/yellow-arrow-lottie.json"
              speed={0.8}
              style={{
                transform: "rotate(-90deg)",
                width: "14rem",
                height: "14rem",
              }}
            />
          </div>
        </div>
      </Flex>
    );
  }

  return (
    <Flex direction="column" justify="center" align="center" gapScale={0.5}>
      <Text>선택한 퍼즐 : {selectedPuzzle.id}</Text>
    </Flex>
  );
};
