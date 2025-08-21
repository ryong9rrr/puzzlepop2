"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { CardTags } from "@puzzlepop2/react-components-card";

import { useSafeRouter } from "@router/useSafeRouter";
import { ModalLayout } from "@shared-components/ModalLayout";

import { useSelectPuzzleStore } from "./useSelectPuzzleStore";

export const SelectedCardModal = () => {
  const router = useSafeRouter();
  const [selectedLevel, setSelectedLevel] = useState<"easy" | "normal" | "hard" | null>(null);
  const { selectedPuzzle } = useSelectPuzzleStore();

  const handleGameStart = () => {
    if (!selectedLevel || !selectedPuzzle) {
      return;
    }

    router.push("/practice/game", {
      slug: selectedPuzzle.id,
      query: { level: selectedLevel },
    });
  };

  if (!selectedPuzzle) {
    return null;
  }

  return (
    <ModalLayout>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        animate={{ opacity: 1 }}
        style={{
          padding: "0.4rem",
        }}
      >
        <Flex direction="column" justify="center" align="center">
          <div style={{ width: "100%", position: "relative", aspectRatio: "16/9" }}>
            <Image
              src={selectedPuzzle.imgSrc}
              alt=""
              fill
              priority
              unoptimized
              style={{
                borderRadius: "0.25rem",
              }}
            />
          </div>
          <Spacing scale={0.4} />
          <Flex direction="column" gapScale={0.4} style={{ width: "100%" }}>
            <CardTags tags={selectedPuzzle.tags} />
            <Text className="ellipsis" size="sm" bold>
              {selectedPuzzle.title}
            </Text>
            <Text size="xs">{selectedPuzzle.description}</Text>
            <Spacing scale={0.5} />

            <Flex justify="space-between" gapScale={0.5}>
              <Button
                variant={selectedLevel === "easy" ? "solid" : "outline"}
                size="xs"
                style={{
                  width: "100%",
                }}
                onClick={() => setSelectedLevel("easy")}
              >
                쉬움
              </Button>
              <Button
                variant={selectedLevel === "normal" ? "solid" : "outline"}
                size="xs"
                style={{ width: "100%" }}
                onClick={() => setSelectedLevel("normal")}
              >
                보통
              </Button>
              <Button
                variant={selectedLevel === "hard" ? "solid" : "outline"}
                size="xs"
                style={{ width: "100%" }}
                onClick={() => setSelectedLevel("hard")}
              >
                어려움
              </Button>
            </Flex>

            <motion.div whileTap={{ scale: 0.95 }} style={{ width: "100%" }}>
              <Button
                size="sm"
                className="font-gameBasic"
                onClick={handleGameStart}
                isDisabled={selectedLevel === null}
                style={{ width: "100%" }}
              >
                게임 시작
              </Button>
            </motion.div>
          </Flex>
        </Flex>
      </motion.div>
    </ModalLayout>
  );
};
