"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Z_INDEX, vars } from "@puzzlepop2/themes";

import { useNavigation } from "@router/useNavigation";
import MODULE_CSS from "./FinishOverlay.module.css";

export const FinishOverlay = () => {
  const router = useNavigation();
  const [redirectTimer, setRedirectTimer] = useState(60);

  const handleRedirect = () => {
    router.redirect("/multi/cooperation");
  };

  // 30초 후 홈으로 이동
  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: Z_INDEX.TOAST_Z_INDEX - 1,
      }}
    >
      <Flex
        className={`${MODULE_CSS.bounceInBack}`}
        direction="column"
        justify="center"
        align="center"
        style={{
          width: "24rem",
          padding: "2rem 0.5rem 0.5rem 0.5rem",
          border: `5px solid ${vars.colors.yellow[500]}`,
          borderRadius: "0.5rem",
          backgroundColor: vars.colors.grey[50],
        }}
      >
        <Image
          src="/win.webp"
          alt=""
          width={1}
          height={1}
          priority
          unoptimized
          style={{
            width: "12rem",
            height: "8rem",
            objectFit: "cover",
          }}
        />
        <Spacing scale={2} />
        <Text className="font-gameBasic">게임이 끝났어요!</Text>
        <Spacing scale={1} />
        <Text size="xs" color="green">
          {redirectTimer}초 후 홈으로 이동할게요
        </Text>
        <Spacing scale={0.5} />
        <Button size="sm" style={{ width: "100%", fontWeight: "800" }} onClick={handleRedirect}>
          나가기
        </Button>
      </Flex>
    </Flex>
  );
};
