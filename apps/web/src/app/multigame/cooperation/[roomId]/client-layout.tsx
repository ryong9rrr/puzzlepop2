"use client";

import { useMemo } from "react";
import { PageProps } from "./types";
import { useCooperationWaitingStore } from "@/stores/useCooperationWaitingStore";
import { BackgroundDefault } from "@/components/backgrounds";
import { LoadingOverlay } from "@/components/games/common";
import * as CDN from "@/constants/cdn";
import { ClientPuzzle } from "./client-puzzle";

export const ClientLayout = (props: PageProps) => {
  const { roomId } = props;
  const { isConnectedGameSocket, isConnectedChatSocket } = useCooperationWaitingStore();

  const isLoadingComplete = useMemo(() => {
    return isConnectedGameSocket && isConnectedChatSocket;
  }, [isConnectedGameSocket, isConnectedChatSocket]);

  return (
    <BackgroundDefault.Main>
      <LoadingOverlay isLoadingComplete={isLoadingComplete} />
      <BackgroundDefault.Background
        src={CDN.RED_TEAM_BACKGROUND}
        blurSrc={CDN.RED_TEAM_BACKGROUND_THUMBNAIL}
      />
      <ClientPuzzle roomId={roomId} />
    </BackgroundDefault.Main>
  );
};
