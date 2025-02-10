import Image from "next/image";
import { Flex, Grid, GridItem, Text, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { SingleGamePuzzle } from "@puzzlepop2/game";
import { http } from "@/utils/http";
import { getRestServerUrl } from "@/utils/end-point";
import { ErrorClient } from "@/shared/components/Error/ErrorClient";

export const GridImages = async () => {
  try {
    const { data } = await http.get<{ data: SingleGamePuzzle[] }>(`${getRestServerUrl()}/puzzls`);
    const puzzles: SingleGamePuzzle[] = data.data;

    return (
      <Grid as="section" templateColumns="repeat(2, 1fr)">
        {/* @ts-ignore */}
        {puzzles?.map((image, index) => {
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
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "4px" }}>
                  <Spacing size={16} />
                  <Text size="sm">제목</Text>
                  <Spacing size={10} />
                  <Text size="xs">{image.src}</Text>
                </div>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    );
  } catch (error) {
    return (
      <ErrorClient>
        <GridImagesSkeleton />
      </ErrorClient>
    );
  }
};

export const GridImagesSkeleton = () => {
  return (
    <Grid as="section" templateColumns="repeat(2, 1fr)" style={{ gap: "var(--responsive-16px)" }}>
      {[...Array(6)].map((_, index) => (
        <GridItem
          key={index}
          style={{
            padding: "8px",
            border: `3px solid ${vars.colors.grey[50]}`,
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
