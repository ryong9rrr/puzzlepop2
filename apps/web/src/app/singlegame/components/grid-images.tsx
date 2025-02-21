"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { QueryClientProvider, useInfiniteQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Flex, Grid, GridItem, Skeleton, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { useIntersectionObserver } from "@puzzlepop2/react-hooks-base";
import { TagGroup } from "@/components/tag";
import { queryClient } from "@/remotes/query-client";
import { fetchGetSingleGamePuzzleList } from "@/remotes/puzzles/singlegame";
import { useSingleGamePage } from "../store";
import styles from "../page.module.css";

export const GridImagesClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GridImages />
    </QueryClientProvider>
  );
};

const GridImages = () => {
  const { setSelectedPuzzle } = useSingleGamePage();
  const { data, isError, isPending, hasNextPage, isFetchingNextPage, observerRef } =
    useInfiniteScroll();

  if (isError || isPending || !data) {
    return <GridImagesSkeleton />;
  }

  const puzzleList = data.pages.flatMap(page => page.data);

  return (
    <>
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
      {isFetchingNextPage && <InfinityLoadingSkeleton />}
      {!isFetchingNextPage && hasNextPage && (
        <div
          ref={observerRef}
          style={{
            width: "100%",
            height: "2rem",
          }}
        ></div>
      )}
    </>
  );
};

const GridImagesSkeleton = (props: { count?: number }) => {
  const count = props.count || 6;

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {[...Array(count)].map((_, index) => (
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

const InfinityLoadingSkeleton = () => {
  return (
    <Flex direction="column">
      <Spacing scale={1} />
      <Flex gapScale={0.8}>
        <Skeleton width="50%" height="2rem" />
        <Skeleton width="50%" height="2rem" />
      </Flex>
    </Flex>
  );
};

const useInfiniteScroll = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isError, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["fetchGetSingleGamePuzzleList"],
      initialPageParam: "",
      queryFn: ({ pageParam: nextCursor = "" }) => {
        return fetchGetSingleGamePuzzleList({ nextCursor });
      },
      getNextPageParam: lastPage => {
        return lastPage.nextCursor;
      },
    });

  const intersectionObserver = useIntersectionObserver(
    {
      ref: observerRef,
    },
    [data],
  );

  useEffect(() => {
    if (
      intersectionObserver &&
      intersectionObserver.isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, intersectionObserver, isFetchingNextPage]);

  return {
    observerRef,
    data,
    isError,
    isPending,
    hasNextPage,
    isFetchingNextPage,
  };
};
