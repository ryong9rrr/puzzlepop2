import { Flex } from "@puzzlepop2/react-components-layout";
import { Suspense } from "react";
import { GridImages, GridImagesSkeleton } from "./components/grid-images";
import { LeftArea } from "./components/left-area";

export default function SingleGamePage() {
  return (
    <main>
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
            <LeftArea />
          </div>
        </section>
        <section style={{ width: "60%", padding: "16px" }}>
          <Suspense fallback={<GridImagesSkeleton />}>
            <GridImages />
          </Suspense>
        </section>
      </Flex>
    </main>
  );
}
