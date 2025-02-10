"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useAlert } from "@puzzlepop2/react-hooks-alert";
import { Title } from "./alert";

export const Selector = () => {
  const router = useRouter();
  const { alert } = useAlert();

  const showAlert = useCallback(() => {
    alert({
      title: <Title />,
      description: "3월 중 오픈합니다",
    });
  }, []);

  return (
    <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
      <Button key="싱글게임" variant="shadow" size="lg" onClick={() => router.push("/singlegame")}>
        싱글게임
      </Button>

      <Button key="멀티게임" variant="shadow" size="lg" onClick={showAlert}>
        멀티게임
      </Button>

      <Button key="패치노트" variant="shadow" size="lg" onClick={showAlert}>
        패치노트
      </Button>
    </Flex>
  );
};
