import Image from "next/image";
import { colors } from "@/theme/colors";
import Background from "@/shared/components/Background";
import Spacing from "@/shared/components/Spacing";
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
        <h1 className="responsive-text-xlg font-bold text-center flex justify-center gap-3">
          <div
            className="font-gamebasic"
            style={{ textShadow: "3px 3px 3px #555", color: colors.primaryYellow["700"] }}
          >
            Puzzle
          </div>
          <div
            className="font-gamebasic"
            style={{ textShadow: "3px 3px 3px #555", color: colors.primaryPurple["700"] }}
          >
            Pop!
          </div>
        </h1>
      </div>
      <Spacing size={48} />
      <Selector />
    </Background>
  );
}
