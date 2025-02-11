import { Flex } from "@puzzlepop2/react-components-layout";
import { GridImagesClient } from "./components/grid-images-client";
import { LeftStickyArea } from "./components/left-sticky-area";
import {
  SINGLE_PAGE_BACKGROUND_PORTAL_ID,
  SINGLE_PAGE_LEFT_STICKY_AREA_PORTAL_ID,
} from "./portal-id";
import Image from "next/image";
import { Z_INDEX } from "@puzzlepop2/themes";

export default function SingleGamePage() {
  return (
    <main style={{ position: "relative" }}>
      {/* TODO: 더 나이스한 디폴트 배경화면 생각해보기... */}
      <Image
        src="/backgrounds/temp.jpg"
        alt=""
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
          opacity: 0.4,
        }}
      />
      <div id={SINGLE_PAGE_BACKGROUND_PORTAL_ID} style={{ width: "100%" }}></div>

      <Flex justify="center" gapScale={1}>
        <section
          style={{
            position: "relative",
            width: "40%",
          }}
        >
          <div
            id={SINGLE_PAGE_LEFT_STICKY_AREA_PORTAL_ID}
            style={{
              width: "100%",
              height: "100vh",
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LeftStickyArea />
          </div>
        </section>

        <section style={{ width: "60%", padding: "0.5rem" }}>
          <GridImagesClient />
        </section>
      </Flex>
    </main>
  );
}
