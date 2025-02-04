import { Box, Flex, Grid, GridItem, Text } from "@puzzlepop2/react-components-layout";
import Image from "next/image";
import * as PostType from "@/app/api/singlegame/post-types";

export const GridImages = async () => {
  const fetchImages = async () => {
    const response = await fetch("http://localhost:3000/api/singlegame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: PostType.GET_SINGLE_GAME_PUZZLE_LIST }),
    });

    const data = await response.json();
    return data;
  };

  const { images = [] } = await fetchImages();

  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap={4}>
      {images.map((image, index) => {
        return (
          <GridItem key={index} style={{ padding: "8px" }}>
            <Flex direction="column" gap={4}>
              <div
                style={{
                  border: "1px solid green",
                  padding: "4px",
                  aspectRatio: "16/9",
                  position: "relative",
                }}
              >
                <Image src={image.src} alt="" fill objectFit="cover" />
              </div>
              <Text size="sm">제목</Text>
              <Text size="xs">설명</Text>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export function SkeletonGridImages() {
  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap={4}>
      {[...Array(6)].map((_, index) => (
        <GridItem key={index} style={{ padding: "8px" }}>
          <Flex direction="column" gap={4}>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "4px",
                aspectRatio: "16/9",
                position: "relative",
              }}
            >
              <Box style={{ width: "100%", height: "100%", backgroundColor: "gray" }} />
            </div>
            <Box style={{ width: "100%", height: "20px", backgroundColor: "gray" }} />
            <Box style={{ width: "100%", height: "20px", backgroundColor: "gray" }} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
}
