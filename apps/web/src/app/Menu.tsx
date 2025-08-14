"use client";

import { motion } from "motion/react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";

import { useSafeRouter } from "@router/useSafeRouter";
import { useAnimatedAlert } from "@shared-hooks/useAnimatedAlert";

export const Menu = () => {
  const router = useSafeRouter();
  const { alert } = useAnimatedAlert();

  return (
    <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="연습모드"
          variant="shadow"
          size="lg"
          onClick={() => router.push("/practice/game")}
        >
          연습모드
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="멀티게임"
          variant="shadow"
          size="lg"
          onClick={() => {
            router.push("/multi/cooperation");
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
            alert("developing");
          }}
        >
          패치노트
        </Button>
      </motion.div>
    </Flex>
  );
};
