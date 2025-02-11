import { Flex } from "@puzzlepop2/react-components-layout";
import { GridImagesClient } from "./components/grid-images-client";
import { LeftStickyArea } from "./components/left-sticky-area";
import { SINGLE_PAGE_LEFT_STICKY_AREA_PORTAL_ID } from "./portal-id";
import { BackgroundPuzzle } from "./components/background-puzzle";

export default function SingleGamePage() {
  return (
    <main style={{ position: "relative" }}>
      <BackgroundPuzzle />

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
