import Image from "next/image";
import clsx from "clsx";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import styles from "./page.module.css";
import { Background } from "@/shared/components/Background";
import { AlertClient } from "./components/alert-client";
import { Selector } from "./components/selector";

export default function HomePage() {
  return (
    <Background
      src="/backgrounds/dynamic-puzzle.gif"
      unoptimized
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Flex justify="center" align="center" direction="column" gapScale={1}>
        <div className={clsx(styles.symbolContainer, "bounce-in-bck")}>
          <Image src="/symbol.png" alt="symbol" layout="responsive" width={1} height={1} priority />
        </div>
        <div className="bounce-in-bck">
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
    </Background>
  );
}
