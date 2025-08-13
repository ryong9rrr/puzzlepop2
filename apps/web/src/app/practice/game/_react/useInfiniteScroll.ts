import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@puzzlepop2/react-hooks-base";
import { fetchGetSingleGamePuzzleList } from "@remotes-single-rest/singleGame/apis";

export const useInfiniteScroll = () => {
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
