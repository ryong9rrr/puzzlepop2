"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/remotes/query-client";
import { GridImages } from "./grid-images";

export const GridImagesClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GridImages />
    </QueryClientProvider>
  );
};
