"use client";

import { ToastProvider } from "@puzzlepop2/react-hooks-toast";
import { GamePageRouter } from "./GamePageRouter";
import { StorageGuard } from "./StorageGuard";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const PuzzlePopClient = ({ roomId, gameType }: Props) => {
  return (
    <ToastProvider>
      <StorageGuard roomId={roomId} gameType={gameType}>
        <GamePageRouter roomId={roomId} gameType={gameType} />
      </StorageGuard>
    </ToastProvider>
  );
};
