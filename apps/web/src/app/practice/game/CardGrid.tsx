"use client";

import { useEffect } from "react";
import { usePromise } from "@puzzlepop2/react-hooks-base";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useModal } from "@puzzlepop2/react-hooks-modal";
import {
  CardGridContainer,
  CardGridItem,
  CardTags,
  CardTitle,
  CardTitleSkeleton,
  CardTagsSkeleton,
} from "@puzzlepop2/react-components-card";
import { CardImage, CardImageSkeleton } from "@shared-components/CardImage";

import { getHttpEndPoint } from "@remotes-web/endPoints";

import { PracticePuzzle } from "../apis/types";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";
import { SelectedCardModal } from "./SelectedCardModal";

export const CardGrid = () => {
  const { toast } = useToast();
  const { open } = useModal();
  const { data, isError, isPending } = usePromise(safeFetchPracticePuzzles);
  const { setSelectedPuzzle } = useSelectPuzzleStore();

  const handleClickCard = (puzzle: PracticePuzzle) => {
    setSelectedPuzzle(puzzle);
    open({
      component: <SelectedCardModal />,
      options: {
        closeOnEscKey: true,
        closeOnOutsideClick: true,
      },
    });
  };

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast({
      payload: {
        message: "연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.",
      },
      duration: 20000,
    });
  }, [isError]);

  if (isPending || isError || !data) {
    return <CardGridSkeleton />;
  }

  return (
    <CardGridContainer>
      {data.map(puzzle => (
        <CardGridItem color="lavender" key={puzzle.id} onClick={() => handleClickCard(puzzle)}>
          <CardImage src={puzzle.imgSrc} />
          <CardTags tags={puzzle.tags} />
          <CardTitle size="sm" title={puzzle.title} />
        </CardGridItem>
      ))}
    </CardGridContainer>
  );
};

const safeFetchPracticePuzzles = async () => {
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

const CardGridSkeleton = () => {
  return (
    <CardGridContainer>
      {new Array(6).fill(null).map((_, index) => (
        <CardGridItem key={index} style={{ cursor: "not-allowed", transform: "none" }}>
          <CardImageSkeleton />
          <CardTagsSkeleton />
          <CardTitleSkeleton />
        </CardGridItem>
      ))}
    </CardGridContainer>
  );
};
