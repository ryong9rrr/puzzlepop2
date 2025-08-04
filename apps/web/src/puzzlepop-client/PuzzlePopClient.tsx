"use client";

import { ToastClient } from "@shared-components/Clients/ToastClient";
import { Connection } from "./Connection";
import { StorageGuard } from "./StorageGuard";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const PuzzlePopClient = ({ roomId, gameType }: Props) => {
  return (
    <ToastClient>
      <StorageGuard roomId={roomId} gameType={gameType}>
        <Connection roomId={roomId} gameType={gameType} />
      </StorageGuard>
    </ToastClient>
  );
};
