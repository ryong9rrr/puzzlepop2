"use client";

import Image from "next/image";
import clsx from "clsx";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { Lottie } from "@/components/lottie";
import { usePuzzleStore } from "../stores/puzzleStore";
import styles from "../page.module.css";

export const LeftStickyArea = () => {
  const { selectedPuzzle } = usePuzzleStore();

  if (!selectedPuzzle) {
    return (
      <div className="animate__animated animate__bounceInLeft">
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
      </div>
    );
  }

  return (
    <Flex justify="center" align="center" style={{ width: "100%", padding: "0.5rem" }}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={clsx(styles.box, styles.boxYellow)}
        style={{
          width: "100%",
        }}
      >
        <div className={styles.imageContainer} style={{ width: "100%" }}>
          <Image src={selectedPuzzle.src} alt="" fill className={styles.image} />
        </div>
        <Text>hi</Text>
      </Flex>
    </Flex>
  );
};
