"use client";

import { useEffect } from "react";
import { Puzzle } from "@/core/puzzle";

export const PuzzleClient = () => {
  useEffect(() => {
    new Puzzle({
      onMouseDrag: ({ event }) => {
        console.log("onMouseDrag", event);
      },
      onMouseEnter: ({ event }) => {
        console.log("onMouseEnter", event);
      },
      onMouseLeave: ({ event }) => {
        console.log("onMouseLeave", event);
      },
    });
  }, []);

  return null;
};
