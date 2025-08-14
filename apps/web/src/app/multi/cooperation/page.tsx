import { ImageBackground } from "@shared-components/ImageBackground";
import { ToastServerProvider } from "@shared-components/server-providers/ToastServerProvider";
import { ModalServerProvider } from "@shared-components/server-providers/ModalServerProvider";
import { SideNavigation } from "@shared-components/SideNavigation";

import * as CDN from "@remotes-cdn/images";

import MODULE_CSS from "../page.module.css";
import { Cards } from "./Cards";

export default function Page() {
  return (
    <>
      <SideNavigation />
      <main style={{ position: "relative" }}>
        <ImageBackground src={CDN.BACKGROUND_BLUE_TRAIN} />
        <ToastServerProvider>
          <ModalServerProvider>
            <div className={MODULE_CSS["grid-layout"]}>
              <Cards />
            </div>
          </ModalServerProvider>
        </ToastServerProvider>
      </main>
    </>
  );
}
