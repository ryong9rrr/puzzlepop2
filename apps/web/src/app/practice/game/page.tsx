import { Flex } from "@puzzlepop2/react-components-layout";

import { ToastClient } from "@shared-components/Clients/ToastClient";
import { StickyBackground } from "@shared-components/StickyBackground";
import { IsMobileWarningToast } from "@shared-components/IsMobileWarningToast";

import { LeftStickyArea } from "./_react/LeftStickyArea";
import { StickyBackgroundImage } from "./_react/StickyBackgroundImage";
import { RightCardGrid } from "./_react/RightCardGrid";

import MODULE_CSS from "./page.module.css";

export default async function Page() {
  return (
    <StickyBackground.Main>
      <StickyBackgroundImage />
      <Flex justify="center" gapScale={1} style={{ paddingLeft: "1rem" }}>
        <section className={MODULE_CSS.left}>
          <div className={MODULE_CSS.sticky}>
            <LeftStickyArea />
          </div>
        </section>
        <section className={MODULE_CSS.right}>
          <ToastClient>
            <RightCardGrid />
          </ToastClient>
        </section>
      </Flex>

      <ToastClient>
        <IsMobileWarningToast />
      </ToastClient>
    </StickyBackground.Main>
  );
}
