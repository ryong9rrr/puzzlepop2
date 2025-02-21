import { Flex } from "@puzzlepop2/react-components-layout";
import { LeftStickyArea } from "./components/left-sticky-area";
import { BackgroundPuzzleImage } from "./components/background-puzzle";
import { GridImagesClient } from "./components/grid-images";
import styles from "./page.module.css";

export default async function SingleGamePage() {
  return (
    <main style={{ position: "relative" }}>
      <Flex justify="center" gapScale={1} style={{ paddingLeft: "1rem" }}>
        <section className={styles.left}>
          <div className={styles.sticky}>
            <LeftStickyArea />
          </div>
        </section>
        <section className={styles.right}>
          <GridImagesClient />
        </section>
      </Flex>

      <BackgroundPuzzleImage />
    </main>
  );
}

export type SearchParams = {
  cursor?: string;
};
