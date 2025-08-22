"use client";

import { Spacing, Text } from "@puzzlepop2/react-components-layout";
import { ModalServerProvider } from "@shared-components/server-providers/ModalServerProvider";
import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { ImageBackground } from "@shared-components/ImageBackground";
import { PageHeader } from "@shared-components/PageHeader";
import { CardGridLayout } from "@shared-components/CardGridLayout";

import * as CDN from "@remotes-cdn/images";

import { CardGrid } from "./CardGrid";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";

export default function Page() {
  const { selectedPuzzle } = useSelectPuzzleStore();

  return (
    <main style={{ position: "relative" }}>
      <ImageBackground
        src={selectedPuzzle ? selectedPuzzle.originImgSrc : CDN.BACKGROUND_PRACTICE}
      />
      <PageHeader />
      <CardGridLayout>
        <ToastServerProvider>
          <ModalServerProvider>
            <Text size="lg" className="font-gameTitle">
              연습모드
            </Text>
            <Spacing scale={0.8} />
            <CardGrid />
          </ModalServerProvider>
        </ToastServerProvider>
      </CardGridLayout>
    </main>
  );
}
