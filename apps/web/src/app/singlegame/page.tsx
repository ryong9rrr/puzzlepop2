import { Flex } from "@puzzlepop2/react-components-layout";
import { GridImagesClient } from "./components/grid-images-client";
import { LeftStickyArea } from "./components/left-sticky-area";
import { BackgroundPuzzle } from "./components/background-puzzle";
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
          <GridImagesClient />
        </section>
      </Flex>

      <BackgroundPuzzle />
    </main>
  );
}
