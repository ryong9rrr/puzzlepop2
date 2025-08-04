"use client";

import { useEffect, useRef } from "react";

import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, IMG_ID } from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";

import { useLoadingStore } from "../stores/useLoadingStore";
import { useUserStore } from "../useUserStore";
import { socketStaticStore } from "../socketStaticStore";

import { setup } from "./canvas/setup";
import { render } from "./canvas/render";

import { useInGameUIStore } from "./useInGameUIStore";

const { send } = socketStaticStore.getState();

export const Canvas = ({ roomId }: { roomId: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const me = useUserStore(state => state.me);

  const setIsSetupCompleteCanvas = useLoadingStore(state => state.setIsSetupCompleteCanvas);

  const imgSrc = useInGameUIStore(state => state.imgSrc);

  const redPuzzle = useInGameUIStore(state => state.redPuzzle);
  const bluePuzzle = useInGameUIStore(state => state.bluePuzzle);

  // 최초한번 게임 데이터 불러오기
  useEffect(() => {
    send({
      type: "GAME",
      message: "GAME_INFO",
      roomId,
      sender: "",
    });
  }, []);

  useEffect(() => {
    if (!imgSrc || !redPuzzle || !bluePuzzle || !me || !imgRef.current || imgRef.current.src) {
      return;
    }

    imgRef.current.src = imgSrc;
    imgRef.current.onload = () => {
      setup();
      const puzzle = me.team === "RED" ? redPuzzle : bluePuzzle;
      render(puzzle.board);
      setIsSetupCompleteCanvas(true);
    };
  }, [imgSrc, redPuzzle, bluePuzzle, me]);

  return (
    <>
      <img ref={imgRef} id={IMG_ID} alt="" style={{ display: "none" }} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          backgroundColor: vars.colors.grey[50],
          borderRadius: "0.25rem",
          opacity: 0.8,
          border: `3px solid ${vars.colors.grey[500]}`,
        }}
      />
    </>
  );
};
