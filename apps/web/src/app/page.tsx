import Image from "next/image";
import Link from "next/link";

import { cdns } from "@puzzlepop2/cdn";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Z_INDEX, vars } from "@puzzlepop2/themes";
import { ImageBackground } from "@shared-components/ImageBackground";
import { PageFooter } from "@shared-components/PageFooter";

import { SafeLink } from "@router/SafeLink";

import MODULE_CSS from "./page.module.css";

export default function Page() {
  return (
    <main style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <ImageBackground src={cdns.backgrounds["bg-moving-puzzle-gif"]} />
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Flex justify="center" align="center" direction="column" gapScale={1}>
          <div className="bounceInBack" style={{ width: "6rem" }}>
            <Image
              src={cdns.symbols["logo"]}
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
          <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
            <SafeLink href="/practice/game" className={MODULE_CSS["hover-grow"]}>
              <Button key="연습모드" variant="shadow" size="lg">
                연습모드
              </Button>
            </SafeLink>

            <SafeLink href="/multi/cooperation" className={MODULE_CSS["hover-grow"]}>
              <Button key="멀티게임" variant="shadow" size="lg">
                멀티게임
              </Button>
            </SafeLink>

            <Link
              href="https://about.puzzlepop.site/patch-note"
              target="_blank"
              className={MODULE_CSS["hover-grow"]}
            >
              <Button key="패치노트" variant="shadow" size="lg">
                패치노트
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: Z_INDEX.DIMMED_Z_INDEX - 1,
        }}
      >
        <PageFooter />
      </div>
    </main>
  );
}
