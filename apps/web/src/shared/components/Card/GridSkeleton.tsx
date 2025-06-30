import { Flex, GridItem, Skeleton, Spacing } from "@puzzlepop2/react-components-layout";

import MODULE_CSS from "./style.module.css";
import Grid from "./Grid";

export default function GridSkeleton(props: { count?: number }) {
  const count = props.count || 6;

  return (
    <Grid>
      {[...Array(count)].map((_, index) => (
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
}
