import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { BackgroundSticky } from "@/components/backgrounds";
import { ModalClient, ToastClient } from "@/components/clients";
import * as CDN from "@/constants/cdn";
import { Rooms } from "./rooms";

export default function Page() {
  return (
    <BackgroundSticky.Main>
      <BackgroundSticky.Background
        src={CDN.COOPERATION_BACKGROUND}
        blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
      />

      <Flex style={{ position: "relative" }}>
        <Box className="roomCardListLeft" style={{ flex: 1 }}></Box>
        <Box style={{ width: "60vw", padding: "0.8rem" }}>
          <ToastClient>
            <ModalClient>
              <Rooms />
            </ModalClient>
          </ToastClient>
        </Box>
        <Box className="roomCardListRight" style={{ flex: 1 }}></Box>
      </Flex>
    </BackgroundSticky.Main>
  );
}
