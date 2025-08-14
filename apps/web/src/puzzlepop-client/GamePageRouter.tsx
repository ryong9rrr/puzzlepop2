"use client";

import { AlertProvider } from "@puzzlepop2/react-hooks-alert";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { ImageBackground } from "@shared-components/ImageBackground";

import * as CDN from "@remotes-cdn/images";

import { WaitingPage } from "./Waiting/WaitingPage";
import { InGamePage } from "./InGame/InGamePage";

import { useConnection } from "./useConnection";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const GamePageRouter = (props: Props) => {
  const { roomId, gameType } = props;

  const { isLoadingComplete, pageStatus } = useConnection({ roomId, gameType });

  return (
    <>
      <LoadingOverlay isLoadingComplete={isLoadingComplete} />

      {pageStatus === "waiting" && (
        <main style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <ImageBackground src={CDN.BACKGROUND_BLUE_MOON} />
          <AlertProvider>
            <WaitingPage roomId={roomId} />
          </AlertProvider>
        </main>
      )}

      {pageStatus === "inGame" && (
        <main style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <ImageBackground src={CDN.BACKGROUND_BLUE_TRAIN} />
          <InGamePage roomId={roomId} gameType={gameType} />
        </main>
      )}
    </>
  );
};
