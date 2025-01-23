import { Background } from "@/components/Background";
import { colors } from "@/theme/colors";
import Image from "next/image";
import Link from "next/link";
import { Selector } from "./Selector";

export default function Welcome() {
  return (
    <Background src="/backgrounds/puzzle.gif">
      <Image src="/symbol.png" alt="symbol" width={200} height={200} priority />
      <Spacing size={16} />
      <h1 className="text-5xl font-bold text-center flex justify-center gap-3">
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
      <Spacing size={16} />
      <Selector />
    </Background>
  );
}

interface SpacingProps {
  size: number;
}

const Spacing = (props: SpacingProps) => {
  const { size } = props;
  return <div style={{ height: size }} />;
};
