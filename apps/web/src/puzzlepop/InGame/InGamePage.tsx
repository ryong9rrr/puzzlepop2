"use client";

import { useEffect } from "react";
import { IMG_ID } from "@puzzlepop2/game-core";

import { socketStaticStore } from "../socketStaticStore";
import { getMultiGameStorage } from "../storage";

import { setup } from "./canvas/setup";
import { render } from "./canvas/render";

import { useInGameStore } from "./useInGameStore";
import { Timer } from "./Timer";
import { ComboToast } from "./ComboToast";

const { send } = socketStaticStore.getState();

export const InGamePage = ({ roomId }: { roomId: string }) => {
  const imgSrc = useInGameStore(state => state.imgSrc);
  const setRenderComplete = useInGameStore(state => state.setRenderComplete);

  const redPuzzle = useInGameStore(state => state.redPuzzle);
  const bluePuzzle = useInGameStore(state => state.bluePuzzle);

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
    if (!imgSrc || !redPuzzle || !bluePuzzle) {
      return;
    }

    const me = getMultiGameStorage().getItem();
    const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
    if (!imgElement || imgElement.src) {
      return;
    }

    imgElement.src = imgSrc;
    imgElement.onload = () => {
      setup();
      const puzzle = me.team === "RED" ? redPuzzle : bluePuzzle;
      render(puzzle.board);
      setRenderComplete(true);
    };
  }, [imgSrc, redPuzzle, bluePuzzle]);

  return (
    <>
      <ComboToast />
      <Timer />
    </>
  );
};
