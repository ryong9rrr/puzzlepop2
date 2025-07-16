import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { StickyBackground } from "@shared-components/StickyBackground";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { ModalClient } from "@shared-components/Clients/ModalClient";
import * as CDN from "@remotes-cdn/images";

import { Center } from "./_react/Center";

export default function Page() {
  return (
    <StickyBackground.Main>
      <StickyBackground.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />
      <Flex style={{ position: "relative" }}>
        <Box style={{ flex: 1 }}>{/* left */}</Box>
        <Box style={{ width: "60vw", padding: "0.8rem" }}>
          <ToastClient>
            <ModalClient>
              <Center />
            </ModalClient>
          </ToastClient>
        </Box>
        <Box style={{ flex: 1 }}>{/* right */}</Box>
      </Flex>
    </StickyBackground.Main>
  );
}
