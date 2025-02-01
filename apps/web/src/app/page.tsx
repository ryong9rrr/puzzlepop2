import Image from "next/image";
import clsx from "clsx";
import styles from "./page.module.css";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { Background } from "@/shared/components/Background";
import Selector from "./Selector";

export default function HomePage() {
  return (
    <Background className={styles.background} src="/backgrounds/dynamic-puzzle.gif" unoptimized>
      <div className={clsx(styles.symbolContainer, styles["bounce-in-bck"])}>
        <Image src="/symbol.png" alt="symbol" layout="responsive" width={1} height={1} priority />
      </div>
      <div className={styles["bounce-in-bck"]}>
        <Flex as="h1" className="font-gamebasic">
          <Text
            typography="4xl"
            color={vars.colors.orange["500"]}
            style={{
              textShadow: "4px 4px 4px #555",
            }}
          >
            Puzzle
          </Text>
          <Spacing direction="horizontal" size={16} />
          <Text
            typography="4xl"
            color={vars.colors.lavender["500"]}
            style={{ textShadow: "4px 4px 4px #555" }}
          >
            Pop!
          </Text>
        </Flex>
      </div>
      <div className="font-gameoutline">
        <Selector />
      </div>
    </Background>
  );
}
