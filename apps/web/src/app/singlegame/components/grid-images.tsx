import { Flex, Grid, GridItem, Text, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import Image from "next/image";
import * as PostType from "@/app/api/singlegame/post-types";
import { vars } from "@puzzlepop2/themes";

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
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap={16}>
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

export function SkeletonGridImages() {
  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap={16}>
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
}
