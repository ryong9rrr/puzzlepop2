"use client";

import { AlertClient } from "@shared-components/Clients/AlertClient";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import * as CDN from "@remotes-cdn/images";

import { WaitingPage } from "./Waiting/WaitingPage";
import { InGamePage } from "./InGame/InGamePage";

import { useConnection } from "./useConnection";

interface ConnectionProps {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const Connection = (props: ConnectionProps) => {
  const { roomId, gameType } = props;

  const { isLoadingComplete, pageStatus } = useConnection({ roomId, gameType });

  return (
    <>
      <LoadingOverlay isLoadingComplete={isLoadingComplete} />

      {pageStatus === "waiting" && (
        <>
          <FullScreenBackground.Background
            src={CDN.COOPERATION_BACKGROUND}
            blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
          />
          <AlertClient>
            <WaitingPage roomId={roomId} />
          </AlertClient>
        </>
      )}

      {pageStatus === "inGame" && (
        <>
          <FullScreenBackground.Background
            src={CDN.RED_TEAM_BACKGROUND}
            blurSrc={CDN.RED_TEAM_BACKGROUND_THUMBNAIL}
          />
          <InGamePage roomId={roomId} gameType={gameType} />
        </>
      )}
    </>
  );
};
