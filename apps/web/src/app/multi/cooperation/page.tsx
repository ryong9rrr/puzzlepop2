import { ImageBackground } from "@shared-components/ImageBackground";
import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { ModalServerProvider } from "@shared-components/server-providers/ModalServerProvider";
import { CardGridLayout } from "@shared-components/CardGridLayout";
import { PageHeader } from "@shared-components/PageHeader";

import * as CDN from "@remotes-cdn/images";

import { Cards } from "./Cards";

export default function Page() {
  return (
    <main style={{ position: "relative" }}>
      <ImageBackground src={CDN.BACKGROUND_BLUE_TRAIN} />
      <PageHeader />
      <ToastServerProvider>
        <ModalServerProvider>
          <CardGridLayout>
            <Cards />
          </CardGridLayout>
        </ModalServerProvider>
      </ToastServerProvider>
    </main>
  );
}
