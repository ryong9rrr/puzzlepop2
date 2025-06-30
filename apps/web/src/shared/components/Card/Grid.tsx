import { PropsWithChildren } from "react";
import { Grid as DesignSystemGrid } from "@puzzlepop2/react-components-layout";

export default function Grid(props: PropsWithChildren) {
  const { children } = props;

  return (
    <DesignSystemGrid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {children}
    </DesignSystemGrid>
  );
}
