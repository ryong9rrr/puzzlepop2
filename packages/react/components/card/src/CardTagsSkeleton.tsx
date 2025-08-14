import { Flex, Skeleton } from "@puzzlepop2/react-components-layout";

export const CardTagsSkeleton = () => {
  return (
    <Flex gapScale={0.3} style={{ width: "40%" }}>
      <Skeleton width="1.5rem" height="0.8rem" />
      <Skeleton width="1rem" height="0.8rem" />
      <Skeleton width="1rem" height="0.8rem" />
    </Flex>
  );
};
