"use client";

import { ToastClient } from "@shared-components/Clients/ToastClient";
import { GamePageRouter } from "./GamePageRouter";
import { StorageGuard } from "./StorageGuard";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const PuzzlePopClient = ({ roomId, gameType }: Props) => {
  return (
    <ToastClient>
      <StorageGuard roomId={roomId} gameType={gameType}>
        <GamePageRouter roomId={roomId} gameType={gameType} />
      </StorageGuard>
    </ToastClient>
  );
};
