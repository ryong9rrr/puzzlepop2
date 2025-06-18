import { ClientLayout } from "./client-layout";
import { PageProps } from "./types";

interface BasePageProps {
  params: Promise<PageProps>;
}

export default async function Page({ params }: BasePageProps) {
  const roomId = (await params).roomId;

  if (!roomId) {
    throw new Error("잘못된 접근입니다.");
  }

  return <ClientLayout roomId={roomId} />;
}
