"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { Lottie } from "@/components/lottie";
import { TagGroup } from "@/components/tag";
import { usePuzzleStore } from "../stores/puzzleStore";
import styles from "../page.module.css";

export const LeftStickyArea = () => {
  const router = useRouter();
  const { selectedPuzzle } = usePuzzleStore();

  const handleClick게임시작 = () => {
    if (selectedPuzzle) {
      router.push(`singlegame/${selectedPuzzle.id}`);
    }
  };

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
          cursor: "default",
        }}
      >
        <div className={styles.imageContainer} style={{ width: "100%" }}>
          <Image src={selectedPuzzle.src} alt="" fill className={styles.image} />
        </div>
        <Spacing scale={0.4} />
        <Flex direction="column" gapScale={0.4} style={{ width: "100%" }}>
          <TagGroup tags={selectedPuzzle.tags} />
          {/* TODO: uploader 속성으로 유저 페이지로 연결시키는 기능 */}
          <Text className={styles.ellipsis} size="sm" bold>
            {selectedPuzzle.title}
          </Text>
          <Text size="xs">{selectedPuzzle.description}</Text>
          <Spacing scale={0.5} />
          <Button onClick={handleClick게임시작}>게임 시작</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
