import { PropsWithChildren } from "react";
import { Grid } from "@puzzlepop2/react-components-layout";

export const CardGrid = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gapScale={0.8}>
      {children}
    </Grid>
  );
};
