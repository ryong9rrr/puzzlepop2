"use client";

import { Grid, Text } from "@puzzlepop2/react-components-layout";

import { RightCardGridErrorSkeleton, RightCardGridSkeleton } from "./RightCardGridSkeletons";
import { RightCardGridItem } from "./RightCardGridItem";
import { TagGroup } from "./TagGroup";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";
import { wait } from "@shared-utils/promises";
import { PracticePuzzle } from "../../apis/types";
import { usePromise } from "@puzzlepop2/react-hooks-base";

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
  await wait(3000);

  const response = await fetch("http://localhost:3000/practice/apis", {
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
