import { Flex } from "@puzzlepop2/react-components-layout";
import { WindowSizeDetectAndWarningClient } from "@/components/clients";
import { BackgroundSticky as BgSticky } from "@/components/backgrounds";
import { LeftStickyArea } from "./components/left-sticky-area";
import { BackgroundSticky } from "./components/background-sticky";
import { GridImagesClient } from "./components/grid-images";
import styles from "./page.module.css";

export default async function Page() {
  return (
    <BgSticky.Main>
      <BackgroundSticky />

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

      <WindowSizeDetectAndWarningClient />
    </BgSticky.Main>
  );
}

export type SearchParams = {
  cursor?: string;
};
