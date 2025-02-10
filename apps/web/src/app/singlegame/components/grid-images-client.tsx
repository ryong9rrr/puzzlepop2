"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/remotes/query-client";
import { Grid } from "@puzzlepop2/react-components-layout";
import { GridImages } from "./grid-images";

export const GridImagesClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid as="section" templateColumns="repeat(2, 1fr)" gapScale={0.8}>
        <GridImages />
      </Grid>
    </QueryClientProvider>
  );
};
