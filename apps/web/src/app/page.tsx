import Image from "next/image";
import { colors } from "@/theme/colors";
import Background from "@/shared/components/Background";
import Spacing from "@/shared/components/Spacing";
import Text from "@/shared/components/Text";
import Selector from "./Selector";
import styles from "./page.module.css";

export default function Welcome() {
  return (
    <Background src="/backgrounds/dynamic-puzzle.gif">
      <div className={styles.container}>
        <div className="w-36 sm:w-36 md:w-48 lg:w-56 xl:w-64">
          <Image src="/symbol.png" alt="symbol" layout="responsive" width={1} height={1} priority />
        </div>
        <Spacing size={48} />
        <h1 className="font-gamebasic responsive-text-xlg font-bold text-center flex justify-center gap-3">
          <Text
            typography="xlg"
            style={{ textShadow: "3px 3px 3px #555", color: colors.primaryYellow["700"] }}
          >
            Puzzle
          </Text>
          <Text
            typography="xlg"
            style={{ textShadow: "3px 3px 3px #555", color: colors.primaryPurple["700"] }}
          >
            Pop!
          </Text>
        </h1>
      </div>
      <Spacing size={48} />
      <div className="font-gameoutline">
        <Selector />
      </div>
    </Background>
  );
}
