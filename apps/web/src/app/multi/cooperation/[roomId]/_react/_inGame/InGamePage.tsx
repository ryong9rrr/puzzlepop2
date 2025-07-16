"use client";

import { useEffect } from "react";
import { IMG_ID } from "@puzzlepop2/game-core";

import { socket } from "@remotes-main/socketStore";

import { useInGameStore } from "../useInGameStore";
import { Timer } from "./Timer";
import { setup } from "./_canvas/setup";
import { render } from "./_canvas/render";

const { send } = socket;

export const InGamePage = ({ roomId }: { roomId: string }) => {
  const gameData = useInGameStore(state => state.gameData);
  const imgSrc = useInGameStore(state => state.imgSrc);

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
    const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

    if (!imgSrc || !imgElement || imgElement.src || !gameData) {
      return;
    }

    imgElement.src = imgSrc;
    imgElement.onload = () => {
      setup();
      render(gameData.redPuzzle.board);
    };
  }, [imgSrc, gameData]);

  return (
    <>
      <Timer roomId={roomId} />
    </>
  );
};
