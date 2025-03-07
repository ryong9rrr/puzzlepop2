"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { motion } from "motion/react";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { Lottie } from "@/components/lottie";
import { TagGroup } from "@/components/tag";
import { useSingleGamePage } from "../store";
import styles from "../page.module.css";

export const LeftStickyArea = () => {
  const router = useRouter();
  const { selectedPuzzle, selectedLevel, setSelectedLevel } = useSingleGamePage();

  const handleClickGameStart = () => {
    if (!selectedLevel || !selectedPuzzle) {
      return;
    }
    router.push(`singlegame/${selectedPuzzle._id}?level=${selectedLevel}`);
  };

  if (!selectedPuzzle) {
    return (
      <div className="animate__animated animate__bounceInLeft">
        <Flex direction="column" align="center" gapScale={0.5}>
          <Spacing scale={7} />
          <Flex direction="column" className="font-gameBasic" gapScale={1}>
            <Text size="xl">퍼즐을</Text>
            <Text size="xl">고르세요 !</Text>
          </Flex>
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
    <Flex justify="center" align="center" style={{ padding: "0.5rem", width: "100%" }}>
      <motion.div
        key={selectedPuzzle._id}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        animate={{ opacity: 1 }}
        style={{ display: "flex", width: "100%" }}
      >
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
            <Image src={selectedPuzzle.imgUrl} alt="" fill sizes="40vw" className={styles.image} />
          </div>
          <Spacing scale={0.4} />
          <Flex direction="column" gapScale={0.4} style={{ width: "100%" }}>
            <TagGroup tags={selectedPuzzle.tags} width="30vw" />
            {/* TODO: uploader 속성으로 유저 페이지로 연결시키는 기능 */}
            <Text className={styles.ellipsis} size="sm" bold>
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
                onClick={handleClickGameStart}
                isDisabled={selectedLevel === null}
                style={{ width: "100%" }}
              >
                게임 시작
              </Button>
            </motion.div>
          </Flex>
        </Flex>
      </motion.div>
    </Flex>
  );
};
