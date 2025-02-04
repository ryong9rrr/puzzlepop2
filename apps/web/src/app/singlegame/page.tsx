import { Flex } from "@puzzlepop2/react-components-layout";
import { ImageCard } from "./components/image-card";

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
    <Flex wrap="wrap" justify="center" style={{ maxWidth: "100vw" }}>
      {images.map((image, index) => (
        <ImageCard key={index} src={image.src} title={image.src} description="설명입니다" />
      ))}
    </Flex>
  );
}
