"use client";

import { useMemo, useState } from "react";

const ROOM_SIZE_MIN = 1;
const ROOM_SIZE_MAX = 8;

export const useRoomSizeField = () => {
  const [roomSize, setRoomSize] = useState(ROOM_SIZE_MIN);

  const isDisabledDecreaseRoomSize = useMemo(() => {
    return roomSize <= ROOM_SIZE_MIN;
  }, [roomSize]);

  const isDisabledIncreaseRoomSize = useMemo(() => {
    return roomSize >= ROOM_SIZE_MAX;
  }, [roomSize]);

  const onDecreaseRoomSize = () => {
    setRoomSize(prev => Math.max(ROOM_SIZE_MIN, prev - 1));
  };

  const onIncreaseRoomSize = () => {
    setRoomSize(prev => Math.min(ROOM_SIZE_MAX, prev + 1));
  };

  return {
    roomSize,
    isDisabledDecreaseRoomSize,
    isDisabledIncreaseRoomSize,
    onDecreaseRoomSize,
    onIncreaseRoomSize,
  };
};
