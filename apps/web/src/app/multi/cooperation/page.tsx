import { cdns } from "@puzzlepop2/cdn";
import { Flex } from "@puzzlepop2/react-components-layout";
import { ImageBackground } from "@shared-components/ImageBackground";
import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { ModalServerProvider } from "@shared-components/server-providers/ModalServerProvider";
import { CardGridLayout } from "@shared-components/CardGridLayout";
import { PageHeader } from "@shared-components/PageHeader";
import { PageFooter } from "@shared-components/PageFooter";

import { Cards } from "./Cards";

export default function Page() {
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <main style={{ position: "relative", flex: 1 }}>
        <ImageBackground src={cdns.backgrounds["bg-team-blue-gif"]} />
        <PageHeader />
        <ToastServerProvider>
          <ModalServerProvider>
            <CardGridLayout>
              <Cards />
            </CardGridLayout>
          </ModalServerProvider>
        </ToastServerProvider>
      </main>
      <PageFooter />
    </Flex>
  );
}
