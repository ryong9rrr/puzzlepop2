"use client";

import { Grid, Text } from "@puzzlepop2/react-components-layout";
import { usePromise } from "@puzzlepop2/react-hooks-base";

import { getHttpEndPoint } from "@remotes-web/endPoints";

import { PracticePuzzle } from "../../apis/types";

import { RightCardGridErrorSkeleton, RightCardGridSkeleton } from "./RightCardGridSkeletons";
import { RightCardGridItem } from "./RightCardGridItem";
import { TagGroup } from "./TagGroup";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";

export const RightCardGrid = () => {
  const { setSelectedPuzzle } = useSelectPuzzleStore();

  const { data, isError, isPending } = usePromise(safeFetch);

  if (isPending) {
    return <RightCardGridSkeleton />;
  }

  if (isError || !data) {
    return <RightCardGridErrorSkeleton />;
  }

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
        {data.map(puzzle => {
          return (
            <RightCardGridItem
              key={puzzle.id}
              imgSrc={puzzle.imgSrc}
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
    </>
  );
};

const safeFetch = async () => {
  const response = await fetch(`${getHttpEndPoint()}/practice/apis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "GET_PUZZLE_LIST",
    }),
  });

  if (response.status === 200) {
    const { data } = await response.json();
    return data as PracticePuzzle[];
  }

  return [];
};
