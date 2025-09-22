"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { cdns } from "@puzzlepop2/cdn";
import { vars } from "@puzzlepop2/themes";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";

import MODULE_CSS from "./Nav.module.css";

const NAV_HEIGHT_REM = 2.5;

export const Nav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundImageRef || !backgroundImageRef.current || !navRef || !navRef.current) {
        return;
      }

      const fontSize = getComputedStyle(document.documentElement).fontSize;

      const backgroundImageHeight = backgroundImageRef.current.clientHeight;
      const navHeightPx = NAV_HEIGHT_REM * parseFloat(fontSize);

      // nav bottom이 백그라운드 이미지 끝에 닿으면
      if (window.scrollY + navHeightPx >= backgroundImageHeight) {
        navRef.current.classList.add(MODULE_CSS["nav-scrolling"]);
      } else {
        navRef.current.classList.remove(MODULE_CSS["nav-scrolling"]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={backgroundImageRef}>
        <BackgroundImage />
      </div>
      <nav ref={navRef} className={MODULE_CSS.nav}>
        <Flex justify="space-between" align="center" style={{ height: `${NAV_HEIGHT_REM}rem` }}>
          <Flex justify="flex-start" align="center">
            <Logo />
            <Spacing direction="horizontal" scale={2} />
            <Link href="/about-us">
              <Text size="lg" className={`${MODULE_CSS["text-hover-underline"]} font-gameTitle`}>
                소개
              </Text>
            </Link>
            <Spacing direction="horizontal" scale={1} />
            <Link href="/patch-note">
              <Text size="lg" className={`${MODULE_CSS["text-hover-underline"]} font-gameTitle`}>
                패치노트
              </Text>
            </Link>
          </Flex>

          <Link href="https://puzzlepop.site/" target="_blank">
            <Button size="xs">게임하러가기</Button>
          </Link>
        </Flex>
      </nav>
    </>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <Flex justify="center" align="center">
        <Image
          src={cdns.symbols.logo}
          alt=""
          priority
          width={100}
          height={100}
          style={{
            width: "1.6rem",
            height: "1.6rem",
          }}
        />
        <div className={MODULE_CSS["responsive-logo"]}>
          <Spacing direction="horizontal" size={4} />
          <div
            className="font-gameBasic"
            style={{ marginTop: "0.1rem", textShadow: "0.05rem 0.05rem 0.05rem #444" }}
          >
            <Text color={vars.colors.orange[500]}>Puzzle</Text>
            <Text color={vars.colors.lavender[500]}>Pop</Text>
          </div>
        </div>
      </Flex>
    </Link>
  );
};

const BackgroundImage = () => {
  return (
    <div className={MODULE_CSS["image-wrapper"]}>
      <Image
        src={cdns.backgrounds["about-nav-background"]}
        alt=""
        width={1920}
        height={1080}
        style={{
          width: "100%",
          height: "10rem",
          objectFit: "cover",
          background: "rgba(0, 0, 0, 0.4)",
        }}
      />
    </div>
  );
};
