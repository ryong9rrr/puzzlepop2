"use client";

import { useLayoutEffect, useRef, useState, CSSProperties } from "react";
import { Flex } from "@puzzlepop2/react-components-layout";

import * as styles from "./CardTags.css";

const TAG_REM_FONT_SIZE = 0.45;
const TAG_REM_PADDING_HORIZONTAL = 0.25;
const TAG_REM_GAP = 0.15;

interface Props {
  tags: string[];

  className?: string;
  style?: CSSProperties;
}

export const CardTags = (props: Props) => {
  const { tags, className, style } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const [renderedTags, setRenderedTags] = useState<string[]>([]);

  const calculateRenderedTags = (): string[] => {
    if (!containerRef.current || !hiddenSpanRef.current) {
      return [];
    }

    const fontSizePx = getComputedStyle(document.documentElement).fontSize;
    const rem = parseInt(fontSizePx.replace("px", ""), 10);
    const gapPx = Math.ceil(TAG_REM_GAP * rem);

    if (!fontSizePx.includes("px") || Number.isNaN(rem)) {
      return [];
    }

    let accWidthPx = 0;
    const result: string[] = [];

    for (const tag of tags) {
      hiddenSpanRef.current.textContent = tag;
      const tagWidthPx = Math.ceil(hiddenSpanRef.current.getBoundingClientRect().width);

      if (accWidthPx + tagWidthPx >= containerRef.current.getBoundingClientRect().width) {
        // 여유공간을 위해 마지막에 1개 더 빼주기
        if (result.length > 0 && accWidthPx > 0) {
          result.pop()!;
        }
        return result;
      }

      accWidthPx += tagWidthPx + gapPx;
      result.push(tag);
    }

    return result;
  };

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      setRenderedTags(calculateRenderedTags());
    });

    const handleResize = () => {
      if (tags.length === 0) {
        return;
      }
      setRenderedTags(calculateRenderedTags());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex
      ref={containerRef}
      className={className}
      gapScale={TAG_REM_GAP}
      wrap="wrap"
      align="center"
      style={{
        fontSize: `${TAG_REM_FONT_SIZE}rem`,
        ...style,
      }}
    >
      {renderedTags.map(tag => (
        <span
          key={tag}
          className={styles.tag}
          style={{
            padding: `0.2rem ${TAG_REM_PADDING_HORIZONTAL}rem`,
            borderRadius: "0.15rem",
            cursor: "pointer",
          }}
        >
          {tag}
        </span>
      ))}
      <span className={styles.tagMore}>
        {tags.length > renderedTags.length ? `+${tags.length - renderedTags.length}` : ""}
      </span>
      <span
        ref={hiddenSpanRef}
        style={{
          position: "absolute",
          padding: `0.2rem ${TAG_REM_PADDING_HORIZONTAL}rem`,
          visibility: "hidden",
          zIndex: -9999,
        }}
      ></span>
    </Flex>
  );
};
