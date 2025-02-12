"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/remotes/query-client";
import { Flex } from "@puzzlepop2/react-components-layout";
import { LeftStickyArea } from "./components/left-sticky-area";
import { BackgroundPuzzle } from "./components/background-puzzle";
import { GridImages } from "./components/grid-images";
import styles from "./page.module.css";

export default function SingleGamePage() {
  return (
    <main style={{ position: "relative" }}>
      <Flex justify="center" gapScale={1} style={{ paddingLeft: "1rem" }}>
        <section className={styles.left}>
          <div className={styles.sticky}>
            <LeftStickyArea />
          </div>
        </section>
        <section className={styles.right}>
          <QueryClientProvider client={queryClient}>
            <GridImages />
          </QueryClientProvider>
        </section>
      </Flex>

      <BackgroundPuzzle />
    </main>
  );
}
