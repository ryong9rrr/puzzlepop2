"use client";

import { useEffect, useState } from "react";

import { MultiGameRoom } from "@/remotes/games/types";

interface Props {
  fetchFn?: () => Promise<MultiGameRoom[]>;
}

export const useGameRooms = (props: Props) => {
  const { fetchFn } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<MultiGameRoom[]>([]);

  const onFetch = async () => {
    if (!fetchFn) {
      return;
    }

    setIsLoading(true);
    const nextRooms = await fetchFn();
    setRooms(nextRooms);
    setIsLoading(false);
  };

  useEffect(() => {
    onFetch();
  }, []);

  return {
    isLoading,
    rooms,
    onFetch,
  };
};
