import { useEffect } from "react";
import { Grid, Flex, GridItem, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";
import { useToast } from "@puzzlepop2/react-hooks-toast";

import MODULE_CSS from "./RightCard.module.css";

const SKELETON_CARD_COUNT = 6;

export const RightCardGridSkeleton = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {[...Array(SKELETON_CARD_COUNT)].map((_, index) => (
        <GridItem key={index} className={MODULE_CSS.box} style={{ cursor: "not-allowed" }}>
          <Flex direction="column" gapScale={0.4}>
            <div className={MODULE_CSS.imageContainer} style={{ width: "25vw" }}>
              <Skeleton width="100%" height="100%" />
            </div>
            <Flex gapScale={0.3} style={{ width: "25vw" }}>
              <Skeleton width="1.5rem" height={24} />
              <Skeleton width="1rem" height={24} />
              <Skeleton width="1rem" height={24} />
            </Flex>
            <Skeleton width="60%" height={32} />
            <Spacing scale={0.1} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};

export const RightCardGridErrorSkeleton = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      payload: {
        message: "연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.",
      },
      duration: 20000,
    });
    // eslint-disable-next-line
  }, []);

  return <RightCardGridSkeleton />;
};

export const InfinityLoadingSkeleton = () => {
  return (
    <Flex direction="column">
      <Spacing scale={1} />
      <Flex gapScale={0.8}>
        <Skeleton width="50%" height="2rem" />
        <Skeleton width="50%" height="2rem" />
      </Flex>
    </Flex>
  );
};
