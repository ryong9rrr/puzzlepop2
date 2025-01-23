import { Background } from "@/server/components/Background";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <Background src="/backgrounds/puzzle.gif">
      <Image src="/symbol.png" alt="symbol" width={240} height={240} priority />
      <h1 className="game text-5xl">퍼즐팝!</h1>
      <ol>
        <Link href="/singlemode">싱글모드</Link>
      </ol>
    </Background>
  );
}
