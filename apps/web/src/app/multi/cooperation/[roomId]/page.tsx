import { AutoBackgroundImage } from "@shared-components/BackgroundImages/AutoBackgroundImage";
import * as CDN from "@remotes-cdn/images";

import { Waiting } from "./_react/Waiting";

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
        src={CDN.RED_TEAM_BACKGROUND}
        blurSrc={CDN.RED_TEAM_BACKGROUND_THUMBNAIL}
      />
      <Waiting roomId={roomId} />
    </AutoBackgroundImage.Main>
  );
}
