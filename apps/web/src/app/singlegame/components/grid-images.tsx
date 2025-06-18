"use client";

import { useEffect, useRef } from "react";
import { QueryClientProvider, useInfiniteQuery } from "@tanstack/react-query";

import { Flex, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import { useIntersectionObserver } from "@puzzlepop2/react-hooks-base";
import { useToast } from "@puzzlepop2/react-hooks-toast";

import { ToastClient } from "@/components/clients";
import { TagGroup } from "@/components/tags";
import { CardGrid, CardGridSkeleton, CardItem, CardTitle } from "@/components/cards";

import { queryClient } from "@/remotes/query-client";
import { fetchGetSingleGamePuzzleList } from "@/remotes/puzzles/singlegame";

import { useSingleGamePage } from "../store";

export const GridImagesClient = () => {
  return (
    <ToastClient>
      <QueryClientProvider client={queryClient}>
        <GridImages />
      </QueryClientProvider>
    </ToastClient>
  );
};

const GridImages = () => {
  const { setSelectedPuzzle } = useSingleGamePage();
  const { data, isError, isPending, hasNextPage, isFetchingNextPage, observerRef } =
    useInfiniteScroll();

  if (isPending) {
    return <CardGridSkeleton />;
  }

  if (isError || !data) {
    return <ErrorSkeleton />;
  }

  const puzzleList = data.pages.flatMap(page => page.data);

  return (
    <>
      <CardGrid>
        {puzzleList.map(puzzle => {
          return (
            <CardItem
              key={puzzle._id}
              imgSrc={`${puzzle.baseUrl}/md.webp`}
              onClick={() => setSelectedPuzzle(puzzle)}
            >
              <TagGroup tags={puzzle.tags.map(text => `#${text}`)} width="25vw" />
              <CardTitle text={puzzle.title} />
            </CardItem>
          );
        })}
      </CardGrid>
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

  return <CardGridSkeleton />;
};
