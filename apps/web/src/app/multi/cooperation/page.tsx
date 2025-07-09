import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { StickyBackground } from "@shared-components/StickyBackground";
import { ToastClient } from "@shared-components/Clients/ToastClient";
import { ModalClient } from "@shared-components/Clients/ModalClient";
import * as CDN from "@remotes-cdn/images";

import { RoomCards } from "./_react/RoomCards";

export default function Page() {
  return (
    <StickyBackground.Main>
      <StickyBackground.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />
      <Flex style={{ position: "relative" }}>
        <Box className="roomCardListLeft" style={{ flex: 1 }}></Box>
        <Box style={{ width: "60vw", padding: "0.8rem" }}>
          <ToastClient>
            <ModalClient>
              <RoomCards />
            </ModalClient>
          </ToastClient>
        </Box>
        <Box className="roomCardListRight" style={{ flex: 1 }}></Box>
      </Flex>
    </StickyBackground.Main>
  );
}
