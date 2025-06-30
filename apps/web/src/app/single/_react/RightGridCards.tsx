"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Flex, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import { useIntersectionObserver } from "@puzzlepop2/react-hooks-base";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { Card } from "@shared-components/Card";

import { useSelectPuzzleStore } from "./selectPuzzleStore";
import { TagGroup } from "./TagGroup";
import { fetchGetSingleGamePuzzleList } from "@remotes-single-rest/singleGame/apis";

export const RightGridCards = () => {
  const { setSelectedPuzzle } = useSelectPuzzleStore();
  const { data, isError, isPending, hasNextPage, isFetchingNextPage, observerRef } =
    useInfiniteScroll();

  if (isPending) {
    return <Card.GridSkeleton />;
  }

  if (isError || !data) {
    return <ErrorSkeleton />;
  }

  const puzzleList = data.pages.flatMap(page => page.data);

  return (
    <>
      <Card.Grid>
        {puzzleList.map(puzzle => {
          return (
            <Card.Item
              key={puzzle._id}
              imgSrc={`${puzzle.baseUrl}/md.webp`}
              onClick={() => setSelectedPuzzle(puzzle)}
            >
              <TagGroup tags={puzzle.tags.map(text => `#${text}`)} width="25vw" />
              <Card.Title text={puzzle.title} />
            </Card.Item>
          );
        })}
      </Card.Grid>
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

const ErrorSkeleton = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      payload: {
        message: "연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.",
      },
      duration: 20000,
    });
    // eslint-disable-next-line
  }, []);

  return <Card.GridSkeleton />;
};
