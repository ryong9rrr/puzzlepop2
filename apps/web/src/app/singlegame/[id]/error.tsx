"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

export default function ErrorPage() {
  const [time, setTime] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    if (time === 0) {
      redirect("/singlegame");
    }

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gapScale={1}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Text size="md" bold>
        잘못된 접근이에요
      </Text>
      <Text size="sm">{time}초 후 싱글게임 페이지로 이동할게요</Text>
    </Flex>
  );
}
