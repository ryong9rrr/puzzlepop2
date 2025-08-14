import Image from "next/image";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { AlertServerProvider } from "@shared-components/server-providers/AlertServerProvider";
import { ImageBackground } from "@shared-components/ImageBackground";

import * as CDN from "@remotes-cdn/images";

import { Menu } from "./Menu";

export default function Page() {
  return (
    <main style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <ImageBackground src={CDN.MOVING_PUZZLE} />
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Flex justify="center" align="center" direction="column" gapScale={1}>
          <div className="bounceInBack" style={{ width: "6rem" }}>
            <Image
              src={CDN.LOGO}
              alt="logo"
              width={1}
              height={1}
              priority
              unoptimized
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className="bounceInBack"
            style={{
              pointerEvents: "none",
            }}
          >
            <Flex as="h1" className="font-gameBasic">
              <Text
                size="5xl"
                color={vars.colors.orange["500"]}
                style={{
                  textShadow: "0.15rem 0.15rem 0.15rem #555",
                }}
              >
                Puzzle
              </Text>
              <Spacing direction="horizontal" scale={0.8} />
              <Text
                size="5xl"
                color={vars.colors.lavender["500"]}
                style={{ textShadow: "0.15rem 0.15rem 0.15rem #555" }}
              >
                Pop!
              </Text>
            </Flex>
          </div>
          <AlertServerProvider>
            <Menu />
          </AlertServerProvider>
        </Flex>
      </Flex>
    </main>
  );
}
