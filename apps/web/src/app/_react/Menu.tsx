"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useAlert } from "@puzzlepop2/react-hooks-alert";
import { useNavigation } from "@router/useNavigation";

import ROAD_WORK from "@public/road-work.webp";

export const Menu = () => {
  const navigate = useNavigation();
  const { alert } = useAlert();

  return (
    <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button key="싱글게임" variant="shadow" size="lg" onClick={() => navigate.push("/single")}>
          싱글게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="멀티게임"
          variant="shadow"
          size="lg"
          onClick={() => {
            alert({
              title: <Developing />,
              description: "개발 중인 기능이에요",
            });
          }}
        >
          멀티게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="패치노트"
          variant="shadow"
          size="lg"
          onClick={() => {
            alert({
              title: <Developing />,
              description: "개발 중인 기능이에요",
            });
          }}
        >
          패치노트
        </Button>
      </motion.div>
    </Flex>
  );
};

export const Developing = () => {
  return (
    <Flex justify="center">
      <div className="animate__animated animate__bounceIn" style={{ width: "6rem" }}>
        <Image
          src={ROAD_WORK}
          alt="https://www.flaticon.com/kr/free-icons/"
          layout="responsive"
          width={1}
          height={1}
        />
      </div>
    </Flex>
  );
};
