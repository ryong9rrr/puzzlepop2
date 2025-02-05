import Image from "next/image";
import { Flex, Grid, GridItem, Text, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

export const GridImages = async () => {
  const fetchImages = async () => {
    try {
      const data = await MOCK_getSingleGamePuzzleList();
      return data;
    } catch (error) {
      return { images: [] };
    }
  };

  // @ts-ignore
  const { images = [] } = await fetchImages();

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)">
      {/* @ts-ignore */}
      {images.map((image, index) => {
        return (
          <GridItem
            key={index}
            className="hover-grow"
            style={{
              padding: "8px",
              border: `3px solid ${vars.colors.grey[300]}`,
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Flex direction="column">
              <div
                style={{
                  padding: "4px",
                  aspectRatio: "16/9",
                  position: "relative",
                }}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div style={{ padding: "4px" }}>
                <Spacing size={16} />
                <Text size="sm">제목</Text>
                <Spacing size={10} />
                <Text size="xs">설명</Text>
              </div>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export const GridImagesSkeleton = () => {
  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" style={{ gap: "var(--responsive-16px)" }}>
      {[...Array(6)].map((_, index) => (
        <GridItem
          key={index}
          style={{
            padding: "8px",
            border: `3px solid ${vars.colors.grey[300]}`,
            borderRadius: "8px",
          }}
        >
          <Flex direction="column">
            <div
              style={{
                padding: "4px",
                aspectRatio: "16/9",
                position: "relative",
              }}
            >
              <Skeleton width="100%" height="100%" />
            </div>
            <div style={{ padding: "4px" }}>
              <Spacing size={16} />
              <Skeleton width="10%" height={20} />
              <Spacing size={10} />
              <Skeleton width="100%" height={20} />
            </div>
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};

const MOCK_getSingleGamePuzzleList = async () => {
  const images = [
    { src: "/map-samples/map-sample1.jpg" },
    { src: "/map-samples/map-sample2.jpg" },
    { src: "/map-samples/map-sample3.jpeg" },
    { src: "/map-samples/map-sample4.jpg" },
    { src: "/map-samples/map-sample5.avif" },
    { src: "/map-samples/map-sample6.jpg" },
  ];

  // 의도적 지연
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        images: images.map((image, index) => {
          return {
            id: index,
            src: image.src,
            title: `제목${index}`,
            description: `설명${index}`,
          };
        }),
      });
    }, 2000);
  });
};
