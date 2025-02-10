import { Flex } from "@puzzlepop2/react-components-layout";
import { Background } from "@/shared/components/Background";
import { LeftAreaClient } from "./components/left-area-client";
import { GridImagesClient } from "./components/grid-images-client";

export default function SingleGamePage() {
  return (
    <Background
      id="single-page-background"
      src="/backgrounds/pink-sky-background-with-crescent-moon.jpg"
      unoptimized
      overHeight
      style={{ padding: "0.5rem" }}
    >
      <Flex justify="center" gap={1}>
        <section
          style={{
            position: "relative",
            width: "40%",
          }}
        >
          <div
            id="single-page-sticky-left-area"
            style={{
              width: "100%",
              height: "100vh",
              position: "sticky",
              top: 0,
              left: 0,
            }}
          >
            {/* 클라이언트 측에서 domId: single-page-sticky-left-area로 접근해 Portal을 생성합니다 */}
            <LeftAreaClient />
          </div>
        </section>
        <section style={{ width: "60%", padding: "16px" }}>
          <GridImagesClient />
        </section>
      </Flex>
    </Background>
  );
}
