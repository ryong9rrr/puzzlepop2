"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Z_INDEX } from "@puzzlepop2/themes";

import { SafeLink } from "@router/SafeLink";

import * as CDN from "@remotes-cdn/images";
import MODULE_CSS from "./PageHeader.module.css";

export const PageHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkItemTextRef1 = useRef<HTMLAnchorElement>(null);
  const linkItemTextRef2 = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !linkItemTextRef1.current || !linkItemTextRef2.current) {
        return;
      }

      if (window.scrollY === 0) {
        containerRef.current.classList.remove(MODULE_CSS["container-border-bottom"]);
        linkItemTextRef1.current.classList.remove(MODULE_CSS["link-item-text-border"]);
        linkItemTextRef2.current.classList.remove(MODULE_CSS["link-item-text-border"]);
        return;
      }
      containerRef.current.classList.add(MODULE_CSS["container-border-bottom"]);
      linkItemTextRef1.current.classList.add(MODULE_CSS["link-item-text-border"]);
      linkItemTextRef2.current.classList.add(MODULE_CSS["link-item-text-border"]);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Flex
        ref={containerRef}
        justify="center"
        align="center"
        className={MODULE_CSS.container}
        style={{
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

            <Flex gap={8} className="font-gameTitle">
              <SafeLink
                href="/practice/game"
                ref={linkItemTextRef1}
                className={MODULE_CSS["link-item-text"]}
              >
                연습모드
              </SafeLink>
              <SafeLink
                href="/multi/cooperation"
                ref={linkItemTextRef2}
                className={MODULE_CSS["link-item-text"]}
              >
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
        src={CDN.LOGO}
        alt="logo"
        width={50}
        height={50}
        priority
        style={{
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </Flex>
  );
};
