import { ToastClient } from "@shared-components/Clients/ToastClient";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import { GameRoute } from "./_react/GameRoute";
import { StorageGuard } from "./_react/StorageGuard";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function Page({ params }: PageProps) {
  const roomId = (await params).roomId;

  if (!roomId) {
    throw new Error("잘못된 접근입니다.");
  }

  return (
    <FullScreenBackground.Main>
      <ToastClient>
        <IsMobileWarningToast />
      </ToastClient>
      <StorageGuard>
        <GameRoute roomId={roomId} />
      </StorageGuard>
    </FullScreenBackground.Main>
  );
}
