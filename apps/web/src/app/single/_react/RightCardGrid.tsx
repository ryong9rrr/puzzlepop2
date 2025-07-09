"use client";

import { Grid, Text } from "@puzzlepop2/react-components-layout";

import {
  InfinityLoadingSkeleton,
  RightCardGridErrorSkeleton,
  RightCardGridSkeleton,
} from "./RightCardGridSkeletons";
import { RightCardGridItem } from "./RightCardGridItem";
import { TagGroup } from "./TagGroup";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const RightCardGrid = () => {
  const { setSelectedPuzzle } = useSelectPuzzleStore();
  const { data, isError, isPending, hasNextPage, isFetchingNextPage, observerRef } =
    useInfiniteScroll();

  if (isPending) {
    return <RightCardGridSkeleton />;
  }

  if (isError || !data) {
    return <RightCardGridErrorSkeleton />;
  }

  const puzzleList = data.pages.flatMap(page => page.data);

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
        {puzzleList.map(puzzle => {
          return (
            <RightCardGridItem
              key={puzzle._id}
              imgSrc={`${puzzle.baseUrl}/md.webp`}
              onClick={() => setSelectedPuzzle(puzzle)}
            >
              <TagGroup tags={puzzle.tags.map(text => `#${text}`)} width="25vw" />
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
            </RightCardGridItem>
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
