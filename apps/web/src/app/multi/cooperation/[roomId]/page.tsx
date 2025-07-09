import { AutoBackgroundImage } from "@shared-components/BackgroundImages/AutoBackgroundImage";
import * as CDN from "@remotes-cdn/images";

import { Waiting } from "./_react/Waiting";
import { ToastProvider } from "@shared-components/Providers/ToastProvider";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";

interface PageProps {
  roomId: string;
}

interface BasePageProps {
  params: Promise<PageProps>;
}

export default async function Page({ params }: BasePageProps) {
  const roomId = (await params).roomId;

  if (!roomId) {
    throw new Error("잘못된 접근입니다.");
  }

  return (
    <AutoBackgroundImage.Main>
      <AutoBackgroundImage.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />
      <ToastProvider>
        <IsMobileWarningToast />
      </ToastProvider>
      <Waiting roomId={roomId} />
    </AutoBackgroundImage.Main>
  );
}
