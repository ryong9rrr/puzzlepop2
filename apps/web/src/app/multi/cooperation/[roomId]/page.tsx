import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { MobileWarningToast } from "@shared-components/MobileWarningToast";

import { PuzzlePopClient } from "@puzzlepop-client/PuzzlePopClient";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function Page({ params }: PageProps) {
  const roomId = (await params).roomId;

  if (!roomId) {
    throw new Error("잘못된 접근입니다.");
  }

  return (
    <>
      <ToastServerProvider>
        <MobileWarningToast />
      </ToastServerProvider>
      <PuzzlePopClient roomId={roomId} gameType="COOPERATION" />
    </>
  );
}
