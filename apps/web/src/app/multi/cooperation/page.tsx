import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { ToastProvider } from "@shared-components/Providers/ToastProvider";
import { ModalProvider } from "@shared-components/Providers/ModalProvider";
import { StickyBackgroundImage } from "@shared-components/BackgroundImages/StickyBackgroundImage";
import * as CDN from "@remotes-cdn/images";

import { RoomCards } from "./_react/RoomCards";

export default function Page() {
  return (
    <StickyBackgroundImage.Main>
      <StickyBackgroundImage.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />

      <Flex style={{ position: "relative" }}>
        <Box className="roomCardListLeft" style={{ flex: 1 }}></Box>
        <Box style={{ width: "60vw", padding: "0.8rem" }}>
          <ToastProvider>
            <ModalProvider>
              <RoomCards />
            </ModalProvider>
          </ToastProvider>
        </Box>
        <Box className="roomCardListRight" style={{ flex: 1 }}></Box>
      </Flex>
    </StickyBackgroundImage.Main>
  );
}
