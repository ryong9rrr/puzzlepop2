"use client";

import Image from "next/image";
import { Z_INDEX } from "@puzzlepop2/themes";
import { useSingleGamePage } from "../store";
import DEFAULT_BACKGROUND from "../../../../public/backgrounds/default-puzzle-list.webp";

export const BackgroundPuzzleImage = () => {
  const { selectedPuzzle } = useSingleGamePage();

  return (
    <Image
      src={selectedPuzzle ? selectedPuzzle.imgUrl : DEFAULT_BACKGROUND}
      alt=""
      width={2440}
      height={1480}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        objectFit: "cover",
        zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
        opacity: 0.4,
      }}
    />
  );
};
