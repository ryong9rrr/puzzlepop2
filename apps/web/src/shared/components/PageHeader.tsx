"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Z_INDEX } from "@puzzlepop2/themes";

import { useSafeRouter } from "@router/useSafeRouter";

import * as CDN from "@remotes-cdn/images";
import MODULE_CSS from "./PageHeader.module.css";

export const PageHeader = () => {
  const router = useSafeRouter();
  const linkItemTextRef1 = useRef<HTMLDivElement>(null);
  const linkItemTextRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!linkItemTextRef1.current || !linkItemTextRef2.current) {
        return;
      }

      if (window.scrollY > 0) {
        linkItemTextRef1.current.classList.add(MODULE_CSS["link-item-text-border"]);
        linkItemTextRef2.current.classList.add(MODULE_CSS["link-item-text-border"]);
      } else {
        linkItemTextRef1.current.classList.remove(MODULE_CSS["link-item-text-border"]);
        linkItemTextRef2.current.classList.remove(MODULE_CSS["link-item-text-border"]);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Flex
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
            <Logo
              onClick={() => {
                router.push("/");
              }}
            />
            <Flex gap={8} className="font-gameTitle">
              <div
                ref={linkItemTextRef1}
                className={MODULE_CSS["link-item-text"]}
                onClick={() => {
                  router.push("/practice/game");
                }}
              >
                연습모드
              </div>
              <div
                ref={linkItemTextRef2}
                className={MODULE_CSS["link-item-text"]}
                onClick={() => {
                  router.push("/multi/cooperation");
                }}
              >
                멀티게임
              </div>
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
