import { StickyBackground } from "@shared-components/StickyBackground";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { ModalClient } from "@shared-components/Clients/ModalClient";
import * as CDN from "@remotes-cdn/images";

import { PageLayout } from "./_react/PageLayout";
import { Center } from "./_react/Center";

export default function Page() {
  return (
    <StickyBackground.Main>
      <StickyBackground.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />
      <PageLayout
        center={
          <ToastClient>
            <ModalClient>
              <Center />
            </ModalClient>
          </ToastClient>
        }
      />
    </StickyBackground.Main>
  );
}
