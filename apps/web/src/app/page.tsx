import Image from "next/image";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { AlertClient } from "@/components/clients";
import { BackgroundDefault } from "@/components/backgrounds";

import * as CDN from "@/constants/cdn";
import { Selector } from "./selector";
import styles from "./page.module.css";

export default function Page() {
  return (
    <BackgroundDefault.Main>
      <BackgroundDefault.Background
        src={CDN.MAIN_BACKGROUND}
        blurSrc={CDN.MAIN_BACKGROUND_THUMBNAIL}
      />

      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Flex justify="center" align="center" direction="column" gapScale={1}>
          <div className={styles.bounceInBack} style={{ width: "6rem" }}>
            <Image src={CDN.LOGO} alt="logo" layout="responsive" width={1} height={1} priority />
          </div>
          <div className={styles.bounceInBack}>
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
          <AlertClient>
            <Selector />
          </AlertClient>
        </Flex>
      </Flex>
    </BackgroundDefault.Main>
  );
}
