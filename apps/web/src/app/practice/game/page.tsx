"use client";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { ModalServerProvider } from "@shared-components/server-providers/ModalServerProvider";
import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { ImageBackground } from "@shared-components/ImageBackground";
import { CardGridLayout } from "@shared-components/CardGridLayout";
import { PageHeader } from "@shared-components/PageHeader";
import { PageFooter } from "@shared-components/PageFooter";

import * as CDN from "@remotes-cdn/images";

import { CardGrid } from "./CardGrid";
import { useSelectPuzzleStore } from "./useSelectPuzzleStore";

export default function Page() {
  const { selectedPuzzle } = useSelectPuzzleStore();

  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <main style={{ position: "relative", flex: 1 }}>
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
      <PageFooter />
    </Flex>
  );
}
