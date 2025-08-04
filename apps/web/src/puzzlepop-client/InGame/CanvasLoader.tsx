"use client";

import { useEffect } from "react";
import { IMG_ID } from "@puzzlepop2/game-core";

import { useUserStore } from "../useUserStore";
import { socketStaticStore } from "../socketStaticStore";

import { setup } from "./canvas/setup";
import { render } from "./canvas/render";

import { useInGameUIStore } from "./useInGameUIStore";
import { useLoadingStore } from "@puzzlepop-client/stores/useLoadingStore";

const { send } = socketStaticStore.getState();

export const CanvasLoader = ({ roomId }: { roomId: string }) => {
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
    if (!imgSrc || !redPuzzle || !bluePuzzle || !me) {
      return;
    }

    const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
    if (!imgElement || imgElement.src) {
      return;
    }

    imgElement.src = imgSrc;
    imgElement.onload = () => {
      setup();
      const puzzle = me.team === "RED" ? redPuzzle : bluePuzzle;
      render(puzzle.board);
      setIsSetupCompleteCanvas(true);
    };
  }, [imgSrc, redPuzzle, bluePuzzle, me]);

  return null;
};
