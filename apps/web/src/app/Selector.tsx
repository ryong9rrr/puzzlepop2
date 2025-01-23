"use client";

import Link from "next/link";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spacing from "@/shared/components/Spacing";

const items = [
  {
    name: "싱글게임",
    url: "/singlegame",
  },
  {
    name: "멀티게임",
    url: "/multigame",
  },
  {
    name: "패치노트",
    url: "/fetchnote",
    black: true,
  },
];

export default function Selector() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const onHover = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const onBlur = useCallback(() => {
    setSelected(-1);
  }, []);

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
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
  }, [selected, router]);

  return (
    <div className="w-42 sm:w-42 md:w-56 lg:w-64">
      <div className="font-gameoutline responsive-text-lg">
        {items.map((item, index) => {
          const isSelected = selected === index;

          return (
            <div key={item.url}>
              <Link
                href={item.url}
                target={item.black ? "_blank" : ""}
                style={{
                  ...createLinkStyles(isSelected),
                }}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={onBlur}
              >
                <div className="p-4 sm:p-4 md:p-4 lg:p-6 xl:p-6">{item.name}</div>
              </Link>
              {index < items.length - 1 && <Spacing size={16} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const createLinkStyles = (isSelected: boolean) => {
  return {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: `rgba(0, 0, 0, ${isSelected ? 0.7 : 0.2})`,
    color: isSelected ? "white" : "rgba(255, 255, 255, 0.6)",
  } as CSSProperties;
};
