import Image from "next/image";
import clsx from "clsx";
import styles from "./page.module.css";
import { Flex, Spacing } from "@puzzlepop2/react";
import * as colors from "@/theme/colors";
import { Background } from "@/shared/components/Background";
import { Text } from "@/shared/components/Text";
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
            typography="2xl"
            color={colors.primaryLightYellow}
            style={{
              textShadow: "3px 3px 3px #555",
            }}
          >
            Puzzle
          </Text>
          <Spacing direction="horizontal" size={16} />
          <Text
            typography="2xl"
            color={colors.primaryLavender}
            style={{ textShadow: "3px 3px 3px #555" }}
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
