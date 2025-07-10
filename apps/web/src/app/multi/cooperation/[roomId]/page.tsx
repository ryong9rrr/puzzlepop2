import { ToastClient } from "@shared-components/Clients/ToastClient";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";
import * as CDN from "@remotes-cdn/images";

import { Waiting } from "./_react/Waiting";

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
      <FullScreenBackground.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />
      <ToastClient>
        <IsMobileWarningToast />
      </ToastClient>
      <Waiting roomId={roomId} />
    </FullScreenBackground.Main>
  );
}
