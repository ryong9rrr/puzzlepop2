"use client";

import { cdns } from "@puzzlepop2/cdn";
import { AlertProvider } from "@puzzlepop2/react-hooks-alert";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { ImageBackground } from "@shared-components/ImageBackground";

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
          <ImageBackground src={cdns.backgrounds["bg-moon-blue-gif"]} />
          <AlertProvider>
            <WaitingPage roomId={roomId} />
          </AlertProvider>
        </main>
      )}

      {pageStatus === "inGame" && (
        <main style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <ImageBackground src={cdns.backgrounds["bg-team-blue-gif"]} />
          <InGamePage roomId={roomId} gameType={gameType} />
        </main>
      )}
    </>
  );
};
