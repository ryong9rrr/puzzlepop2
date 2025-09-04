"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cdns } from "@puzzlepop2/cdn";
import { Z_INDEX } from "@puzzlepop2/themes";
import { Flex, Spacing } from "@puzzlepop2/react-components-layout";

import { SafeLink } from "@router/SafeLink";

import MODULE_CSS from "./PageHeader.module.css";

const HEADER_HEIGHT = 60;

export const PageHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }

      const isTop = window.scrollY === 0;

      if (isTop) {
        containerRef.current.classList.remove(MODULE_CSS["container-scrolling"]);
        return;
      }

      containerRef.current.classList.add(MODULE_CSS["container-scrolling"]);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Spacing size={HEADER_HEIGHT} />
      <Flex
        ref={containerRef}
        justify="center"
        align="center"
        className={MODULE_CSS.container}
        style={{
          height: HEADER_HEIGHT,
          zIndex: Z_INDEX.DIMMED_Z_INDEX - 1,
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{
            width: "100%",
            maxWidth: "1024px",
          }}
        >
          <Flex align="center" gap={20}>
            <SafeLink href="/">
              <Logo />
            </SafeLink>

            <Flex className="font-gameTitle">
              <SafeLink href="/practice/game" className={MODULE_CSS["link"]}>
                연습모드
              </SafeLink>
              <SafeLink href="/multi/cooperation" className={MODULE_CSS["link"]}>
                멀티게임
              </SafeLink>
            </Flex>
          </Flex>
          <div>{/* 마이페이지 */}</div>
        </Flex>
      </Flex>
    </>
  );
};

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Flex className={MODULE_CSS.logo} justify="center" align="center" onClick={onClick}>
      <Image
        src={cdns.symbols.logo}
        alt="logo"
        width={45}
        height={45}
        priority
        style={{
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </Flex>
  );
};
