import { Flex } from "@puzzlepop2/react-components-layout";

import { ToastProvider } from "@shared-components/Providers/ToastProvider";
import { TanStackProvider } from "@shared-components/Providers/TanStackProvider";
import { StickyBackgroundImage as SharedStickyBackgroundImage } from "@shared-components/BackgroundImages/StickyBackgroundImage";
import { WindowSizeDetectAndWarning } from "@shared-components/WindowSizeDetectAndWarning";

import MODULE_CSS from "./page.module.css";
import { RightGridCards } from "./_react/RightGridCards";
import { LeftStickyArea } from "./_react/LeftStickyArea";
import { StickyBackgroundImage } from "./_react/StickyBackgroundImage";

export type SearchParams = {
  cursor?: string;
};

export default async function Page() {
  return (
    <SharedStickyBackgroundImage.Main>
      <StickyBackgroundImage />
      <Flex justify="center" gapScale={1} style={{ paddingLeft: "1rem" }}>
        <section className={MODULE_CSS.left}>
          <div className={MODULE_CSS.sticky}>
            <LeftStickyArea />
          </div>
        </section>
        <section className={MODULE_CSS.right}>
          <ToastProvider>
            <TanStackProvider>
              <RightGridCards />
            </TanStackProvider>
          </ToastProvider>
        </section>
      </Flex>

      <ToastProvider>
        <WindowSizeDetectAndWarning />
      </ToastProvider>
    </SharedStickyBackgroundImage.Main>
  );
}
