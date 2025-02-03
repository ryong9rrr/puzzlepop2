"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useAlert } from "@puzzlepop2/react-hooks-alert";
import { Title } from "./alert";

const items = [
  {
    name: "싱글게임",
    url: "/singlegame",
    isDeveloping: true,
  },
  {
    name: "멀티게임",
    url: "/multigame",
    isDeveloping: true,
  },
  {
    name: "패치노트",
    url: "/fetchnote",
    isDeveloping: true,
    black: true,
  },
];

export const Selector = () => {
  const router = useRouter();
  const { isShowAlert, alert } = useAlert();
  const [selected, setSelected] = useState(0);

  const onHover = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleClick = useCallback(() => {
    const item = items[selected];

    if (item.name === "싱글게임") {
      router.push("/singlegame");
      return;
    }

    // TODO: 개발이 끝나면 삭제
    if (item.isDeveloping) {
      alert({
        title: <Title />,
        description: "3월 중 오픈합니다",
      });
      return;
    }
    if (item.black) {
      window.open(item.url, "_blank");
      return;
    }
    router.push(item.url);
    return;
  }, [alert, router, selected]);

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (isShowAlert) {
        return;
      }

      if (!(0 <= selected && selected < items.length)) {
        setSelected(0);
      }

      if (e.key === " " || e.code === "Space" || e.key === "ArrowDown" || e.code === "ArrowDown") {
        const nextIndex = (selected + 1) % items.length;
        setSelected(nextIndex);
        return;
      }

      if (e.key === "ArrowUp" || e.code === "ArrowUp") {
        const nextIndex = selected - 1 < 0 ? items.length - 1 : selected - 1;
        setSelected(nextIndex);
        return;
      }

      if (e.key === "Enter" || e.code === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("keydown", keyboardHandler);
    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [selected, router, alert, isShowAlert, handleClick]);

  return (
    <Flex direction="column" gap={10} className="font-gameoutline">
      {items.map((item, index) => {
        return (
          <Button
            key={item.url}
            variant="shadow"
            size="xl"
            onMouseEnter={() => onHover(index)}
            onClick={handleClick}
            data-is-selected={selected === index}
          >
            {item.name}
          </Button>
        );
      })}
    </Flex>
  );
};
