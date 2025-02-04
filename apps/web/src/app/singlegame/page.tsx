import { Box, Flex, Text } from "@puzzlepop2/react-components-layout";
import Image from "next/image";

const images = [
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
];

export default function SingleGamePage() {
  return (
    <main style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      <Flex justify="center" gap={1}>
        <div
          style={{
            position: "relative",
            width: "40%",
            border: "1px solid tomato",
          }}
        >
          <Box
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
            <Text>여기에서 portal로 클라이언트의 children을 넣는다</Text>
          </Box>
        </div>
        <Flex wrap="wrap" justify="center" style={{ width: "60%", border: "1px solid blue" }}>
          {images.map((image, index) => {
            return (
              <Flex
                direction="column"
                gap={4}
                key={index}
                style={{ border: "1px solid green", padding: "4px" }}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={160 * 1.6}
                  height={90 * 1.6}
                  style={{ objectFit: "cover" }}
                />
                <Text size="sm">제목</Text>
                <Text size="xs">설명</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </main>
  );
}
