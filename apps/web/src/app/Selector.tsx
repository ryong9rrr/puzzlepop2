"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spacing from "@/shared/components/Spacing";
import Text from "@/shared/components/Text";
import { AlertProvider, useAlert } from "@/shared/Alert";
import { createShadowButtonStyle } from "@/shared/components/Button/Button";

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

export default function Selector() {
  return (
    <AlertProvider>
      <SelectorComponent />
    </AlertProvider>
  );
}

const SelectorComponent = () => {
  const router = useRouter();
  const { isShowAlert, alert } = useAlert();
  const [selected, setSelected] = useState(0);

  const onHover = useCallback((index: number) => {
    setSelected(index);
  }, []);

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
        const item = items[selected];

        // TODO: 개발이 끝나면 삭제
        if (item.isDeveloping) {
          alert({
            title: "서비스 준비 중이에요",
            description: "곧 찾아뵐게요!",
          });
          return;
        }

        if (item.black) {
          window.open(item.url, "_blank");
          return;
        }
        router.push(item.url);
        return;
      }
    };

    window.addEventListener("keydown", keyboardHandler);
    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [selected, router, isShowAlert, alert]);

  return (
    <div className="w-42 sm:w-42 md:w-56 lg:w-64">
      {items.map((item, index) => {
        const isSelected = selected === index;

        // TODO: 개발이 끝나면 삭제
        if (item.isDeveloping) {
          return (
            <div key={item.url} className="cursor-pointer">
              <div
                style={{
                  ...createShadowButtonStyle({ isSelected }),
                }}
                onMouseEnter={() => onHover(index)}
                onClick={() => {
                  alert({
                    title: "서비스 준비 중이에요",
                    description: "곧 찾아뵐게요!",
                  });
                }}
              >
                <Text typography="lg" className="responsive-button-padding">
                  {item.name}
                </Text>
              </div>
              {index < items.length - 1 && <Spacing size={16} />}
            </div>
          );
        }

        return (
          <div key={item.url} className="cursor-pointer">
            <Link
              href={item.url}
              target={item.black ? "_blank" : ""}
              style={{
                ...createShadowButtonStyle({ isSelected }),
              }}
              onMouseEnter={() => onHover(index)}
            >
              <Text typography="lg" className="responsive-button-padding">
                {item.name}
              </Text>
            </Link>
            {index < items.length - 1 && <Spacing size={16} />}
          </div>
        );
      })}
    </div>
  );
};
