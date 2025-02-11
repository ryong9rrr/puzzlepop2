"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Flex, Grid, GridItem, Skeleton, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { fetchGetSingleGamePuzzleList } from "@/remotes/puzzles/singlegame";
import { sleep } from "@/app/utils/sleep";
import styles from "./grid-images.module.css";
import { usePuzzleStore } from "../stores/puzzleStore";

export const GridImages = () => {
  // TODO: 무한스크롤로 바꾸기
  const {
    data: puzzleList,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["fetchGetSingleGamePuzzleList"],
    queryFn: async () => {
      const data = await fetchGetSingleGamePuzzleList();
      return await sleep(() => data, 3000);
      //return data as SingleGamePuzzle[];
    },
  });

  const { setSelectedPuzzle } = usePuzzleStore();

  if (isError || isPending) {
    return <GridImagesSkeleton />;
  }

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {puzzleList.map((puzzle, index) => {
        return (
          <GridItem
            key={index}
            className={clsx("hover-grow", styles.gridItem)}
            onClick={() => setSelectedPuzzle(puzzle)}
          >
            <Flex direction="column">
              <div className={styles.gridImageContainer}>
                <Image src={puzzle.src} alt="" fill className={styles.gridImage} />
              </div>
              <>
                <Spacing scale={0.6} />
                <Text size="sm">제목</Text>
                <Spacing scale={0.5} />
                <Text size="xs">{puzzle.src}</Text>
              </>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};

const GridImagesSkeleton = () => {
  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {[...Array(6)].map((_, index) => (
        <GridItem key={index} className={styles.gridItem}>
          <Flex direction="column">
            <div className={styles.gridImageContainer}>
              <Skeleton width="100%" height="100%" />
            </div>
            <>
              <Spacing scale={0.6} />
              <Skeleton width="10%" height={20} />
              <Spacing scale={0.5} />
              <Skeleton width="100%" height={20} />
            </>
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};
