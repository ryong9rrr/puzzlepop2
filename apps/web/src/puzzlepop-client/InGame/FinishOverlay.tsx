"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Z_INDEX, vars } from "@puzzlepop2/themes";

import * as CDN from "@remotes-cdn/images";

import { useNavigation } from "@router/useNavigation";

export const FinishOverlay = () => {
  const navigation = useNavigation();
  const [redirectTimer, setRedirectTimer] = useState(60);

  const handleRedirect = () => {
    navigation.redirect("/multi/cooperation");
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
        zIndex: Z_INDEX.TOAST_Z_INDEX - 2,
      }}
    >
      <CongratulationLotties />
      <Flex
        className="bounceInBack"
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
          src={CDN.WIN}
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

const CongratulationLotties = () => {
  return (
    <>
      <Lottie top={100} left={100} />
      <Lottie bottom={100} right={100} speed={1.2} />
      <Lottie bottom={430} right={100} />
      <Lottie top={500} left={600} />
      <Lottie top={300} left={200} speed={1.5} />
      <Lottie top={100} right={200} />
      <Lottie top={120} right={412} speed={1.4} />
      <Lottie top={50} left={234} />
      <Lottie top={25} left={704} speed={0.7} />
    </>
  );
};

const Lottie = ({
  top,
  left,
  bottom,
  right,
  speed,
}: {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  speed?: number;
}) => {
  return (
    <DotLottieReact
      autoplay
      loop
      speed={speed || 1}
      src="/lotties/congratulations.lottie"
      style={{
        position: "absolute",
        top: top ? `${top}px` : undefined,
        left: left ? `${left}px` : undefined,
        bottom: bottom ? `${bottom}px` : undefined,
        right: right ? `${right}px` : undefined,
        width: "10rem",
        height: "10rem",
        zIndex: Z_INDEX.TOAST_Z_INDEX - 1,
        pointerEvents: "none",
      }}
    />
  );
};
