import { Flex } from "@puzzlepop2/react-components-layout";
import { StickyBackground } from "@shared-components/StickyBackground";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { ModalClient } from "@shared-components/Clients/ModalClient";
import { SideNavigation } from "@shared-components/SideNavigation";

import * as CDN from "@remotes-cdn/images";

import { Center } from "./_react/Center";

export default function Page() {
  return (
    <>
      <SideNavigation />
      <StickyBackground.Main>
        <StickyBackground.Background
          src={CDN.COOPERATION_BACKGROUND}
          blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
        />
        <ToastClient>
          <ModalClient>
            <Flex
              direction="column"
              justify="center"
              style={{ margin: "0 auto", width: "60vw", padding: "0.8rem" }}
            >
              <Center />
            </Flex>
          </ModalClient>
        </ToastClient>
      </StickyBackground.Main>
    </>
  );
}
