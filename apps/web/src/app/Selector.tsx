"use client";

import Link from "next/link";
import { useState } from "react";

export const Selector = () => {
  const [selected, setSelected] = useState<"싱글게임" | "멀티게임" | "패치노트">("싱글게임");

  return (
    <ol className="font-gameoutline text-2xl flex flex-col gap-2 text-center">
      <Link href="/singlegame">
        <div>싱글게임</div>
      </Link>
      <Link href="/multigame">
        <div>멀티게임</div>
      </Link>
      <Link href="/fetchnote">
        <div>패치노트</div>
      </Link>
    </ol>
  );
};
