"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Flex, Grid, GridItem, Skeleton, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { sleep } from "@/app/utils/sleep";
import { TagGroup } from "@/components/tag";
import { fetchGetSingleGamePuzzleList } from "@/remotes/puzzles/singlegame";
import { useSingleGamePage } from "../store";
import styles from "../page.module.css";

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
      return await sleep(() => data, 1000);
      //return data as SingleGamePuzzle[];
    },
  });

  const { setSelectedPuzzle } = useSingleGamePage();

  if (isError || isPending) {
    return <GridImagesSkeleton />;
  }

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {puzzleList.map(puzzle => {
        return (
          <GridItem
            key={puzzle._id}
            className={clsx(styles.hoverGrow, styles.box, styles.boxLavender)}
            onClick={() => setSelectedPuzzle(puzzle)}
          >
            <Flex direction="column" gapScale={0.4}>
              <div className={styles.imageContainer}>
                <Image
                  src={puzzle.imgUrl}
                  alt="썸네일"
                  fill
                  sizes="25vw"
                  className={styles.image}
                />
              </div>
              <TagGroup tags={puzzle.tags} />
              <Text
                style={{
                  width: "25vw",
                }}
                className="ellipsis"
                size="sm"
                bold
              >
                {puzzle.title}
              </Text>
              <Spacing scale={0.1} />
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
        <GridItem key={index} className={styles.box} style={{ cursor: "not-allowed" }}>
          <Flex direction="column" gapScale={0.4}>
            <div className={styles.imageContainer} style={{ width: "25vw" }}>
              <Skeleton width="100%" height="100%" />
            </div>
            <Flex gapScale={0.3} style={{ width: "25vw" }}>
              <Skeleton width="1.5rem" height={24} />
              <Skeleton width="1rem" height={24} />
              <Skeleton width="1rem" height={24} />
            </Flex>
            <Skeleton width="60%" height={32} />
            <Spacing scale={0.1} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};
