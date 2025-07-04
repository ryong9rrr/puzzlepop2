import Image from "next/image";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars, Z_INDEX } from "@puzzlepop2/themes";
import backgroundGifImage from "../../public/backgrounds/dynamic-puzzle.webp";
import { AlertClient } from "../components/alert-client";
import { Selector } from "./selector";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Flex justify="center" align="center" direction="column" gapScale={1}>
          <div className={styles.bounceInBack} style={{ width: "6rem" }}>
            <Image
              src="/symbol.png"
              alt="symbol"
              layout="responsive"
              width={1}
              height={1}
              priority
            />
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

      <Image
        src={backgroundGifImage}
        alt="puzzlepop background"
        fill
        priority
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
          opacity: 0.4,
        }}
      />
    </main>
  );
}
